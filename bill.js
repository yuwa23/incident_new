// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');



function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
   var  ingnoreNumber;
   var billThreshold = 300 // in seconds;
   var billbysecondrate = 3 // in cents
   var billbyminuterate = 150 // in cents
   var final_bill = 0;
   
   var createanArray = function(csvString,cbone) {
       var billArray =  S.replace( /\n/g, " " ).split( " " );
       cbone(null,billArray);
   } 
   
   var sort_by = function() {
    var fields = [].slice.call(arguments),
        n_fields = fields.length;

    return function(A, B) {
        var a, b, field, key, primer, reverse, result;
        for (var i = 0, l = n_fields; i < l; i++) {
            result = 0;
            field = fields[i];

            key = typeof field === 'string' ? field : field.name;

            a = A[key];
            b = B[key];

            if (typeof field.primer !== 'undefined') {
                a = field.primer(a);
                b = field.primer(b);
            }
            reverse = (field.reverse) ? -1 : 1;

            if (a < b) result = reverse * -1;
            if (a > b) result = reverse * 1;
            if (result !== 0) break;
        }
        return result;
    }
  }
   
   var createDurationarray  = function(dataArr,cbtwo) {
      let i;
      let arrBill = [];
      for (i = 0; i < dataArr.length; ++i) {
        //promises.push(doSomethingAsync(i));
            var jsonObj = {}
            var duration = dataArr[i].split(',')[0];
            var a = duration.split(':'); // split it at the colons
            var duration_seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            var pnumber = dataArr[i].split(',')[1];
            pnumber = pnumber.replace('-','').replace('-','');
            jsonObj.pnumber = pnumber;
            jsonObj.duration = duration_seconds;
            arrBill.push(jsonObj);
      }
	   arrBill.sort(sort_by('duration', {
			pnumber: 'pnumber',
			reverse: true
		}));
	   ingnoreNumber = arrBill[arrBill.length-1].pnumber
	   cbtwo(null,arrBill);
   }
   
   
   var calculateBill = function (finalArr,cbthree) {
       var billThreshold = 300 // in seconds
       for (i = 0; i < finalArr.length; ++i) {
           console.log(finalArr[i]);
         if(finalArr[i].pnumber === ingnoreNumber) {
            continue;                 
         } else if(finalArr[i].duration <  billThreshold) {
            final_bill = final_bill + (finalArr[i].duration) * billbysecondrate;
         } else {
            final_bill = final_bill + (finalArr[i].duration/60) * billbyminuterate;
         }
       }
       return cbthree(null,final_bill);
   }

   
  createanArray(S,function(err,dataArr) {
		createDurationarray(dataArr,function(err,arrBill) {
			calculateBill (arrBill,function(err,final_bill) {
					console.log(final_bill);
					return final_bill; 
			})                   
		})
  })
  
}