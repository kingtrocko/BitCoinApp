var BitcoinPrices = [];

$(document).ready(function() {
    Rx.Observable.defer(function() 
        { 
            return renderPriceToUI(); 
        }).concat(countdown()).repeat().subscribe();
});

function renderPriceToUI() {
    return $.getJSONAsObservable("/getcurrentprice")
        .select(function(d) { return d; })
        .do(
            function(result) {
                //console.log('the result ' + JSON.stringify(result));
                
                $('#lbl-price').html(result.data.total.amount);
                BitcoinPrices.push(result.data.total.amount);

                if(BitcoinPrices.length >= 5){
                    displayAvg();
                }
            });
}

function countdown() {
    return Rx.Observable.generateWithRelativeTime(
        10,  //initialstate
        function(x) { return x >= 0; }, //condition
        function(x) { return x - 1; }, //iterate
        function(x) { $("#cdDiv").html(x); return x; }, //resultSelector
        function(x) { return 1000; } //timeSelector
        );
}

function displayAvg()
{
    var sum = 0;
    var avg = 0;
    var source = Rx.Observable.fromArray(BitcoinPrices).map(function (value, index, obs)
    {
        //return only the latest 5 array values.
        if( index >= Math.abs(BitcoinPrices.length - 5) ){
            return value;
        }
        return 0;
    });

    var subscription = source.subscribe(
        function (x) {
            sum += parseFloat(x);
    });
    avg =  sum / 5;
    $('#avgValue').html(avg.toFixed(2));
}