var BitcoinPrices = [];


function countdown() {
    // your code goes here
    var count = 10;
    var timerId = setInterval(function() {
        count--;
        $('#cdDiv').html(count);

        if(count == 0) {
            
            var currentPrice = getPrice();


            if(BitcoinPrices.length >= 5)
            {
                displayAvg(BitcoinPrices);
            }

            count = 10;
        }
    }, 1000);
}

function getPrice ()
{
    //creates a stream
    var requestStream = Rx.Observable.just('/getcurrentprice');

    var responseStream = requestStream.flatMap(function(requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });

    responseStream.subscribe(function (response){
        displayPrice(response.total.amount);
        BitcoinPrices.push(response.total.amount);
        return response.total.amount;
    });
}

function displayPrice(the_price)
{
    $('#lbl-price').html(the_price);
}

function displayAvg(arr)
{
    var sum2 = 0;
    var source = Rx.Observable.fromArray(arr).map(function (value, index, obs){
        //return only the latest 5 array values.
        if( index >= Math.abs(5 - ( arr.length )) ){
            return value;
        }
        return 0;
    });

    var subscription = source.subscribe(
    function (x) {
        sum2 += parseFloat(x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function (){
        console.log('Completed');
    });

/*
    var sum = 0;
    for(var i = (arr.length - 1); i >= (arr.length - 5); i--)
    {
        sum += parseFloat(arr[i]);
    }
    */
    
    var avg =  sum2 / 5;

    $('#avgValue').html(avg.toFixed(2));
}

countdown();