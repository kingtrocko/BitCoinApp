var BitcoinPrices = [];


function countdown() {
    // your code goes here
    var count = 10;
    var timerId = setInterval(function() {
        count--;
        $('#cdDiv').html(count);

        if(count == 0) {
            var request = $.ajax({
                type: 'GET',
                url: '/getcurrentprice'
            });

             request.done(function (response, textStatus, jqXHR){
                console.log('amount ' + response.total.amount);
                var p = response.total.amount;

                displayPrice(p)
                
                BitcoinPrices.push(p);

                if(BitcoinPrices.length >= 5)
                {
                    displayAvg(BitcoinPrices);
                }
            });

            count = 10;
        }
    }, 1000);
}

function displayPrice(the_price)
{
    $('#lbl-price').html(the_price);
}

function displayAvg(arr)
{
    var sum = 0;
    for(var i = (arr.length - 1); i >= (arr.length - 5); i--)
    {
        sum += parseFloat(arr[i]);
    }
    var avg =  sum / 5;

    $('#avgValue').html(avg.toFixed(2));
}

countdown();