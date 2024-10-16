//API query
foodId = '171009'; //169910
foodAction = 'food/' + foodId; //'foods/search'
apiKey = 'wj05DNt0GjyTM5hDjcvHtEszLb0IpTZtdcWyMDdE'
queryItem = '' //Mango

function processFoodData(foodNutrients) {
    arr = [];
    foodNutrients.forEach((foodNutrient) => {
        tmp = [];
        tmp.push(foodNutrient.nutrient.name + "\t");
        tmp.push("\t" + foodNutrient.amount + ";");
        tmp.push("\t" + foodNutrient.nutrient.unitName);
        arr.push(tmp);
    })

    return arr;
}

function filterNutrientData(processedFoodData) {
    const filter = [
        "Vitamin A, RAE" + "\t",               
        "Thiamin" + "\t",                      
        "Riboflavin" + "\t",                   
        "Niacin" + "\t",                       
        "Pantothenic acid" + "\t",             
        "Vitamin B-6" + "\t",                  
        "Biotin" + "\t",                       
        "Folate, total" + "\t",               
        "Vitamin B-12" + "\t",                 
        "Vitamin C, total ascorbic acid" + "\t", 
        "Vitamin D (D2 + D3)" + "\t",         
        "Vitamin E (alpha-tocopherol)" + "\t", 
        "Vitamin K (phylloquinone)" + "\t",    
        "Calcium, Ca" + "\t",                  
        "Iron, Fe" + "\t",                     
        "Magnesium, Mg" + "\t",               
        "Zinc, Zn" + "\t",                    
        "Selenium, Se" + "\t",                
        "Potassium, K" + "\t",                 
        "Phosphorus, P" + "\t",               
        "Iodine, I" + "\t",                   
        "Copper, Cu" + "\t",                  
        "Manganese, Mn" + "\t",              
        "Choline, total" + "\t",              
        "Fatty acids, total polyunsaturated" + "\t",   
        "Protein" + "\t"                      
      ];

      filteredArr = [];

      for (let i = 0; i < processedFoodData.length; i++) {
        if(filter.includes(processedFoodData[i][0])) {    
            filteredArr.push(processedFoodData[i]);
        }
      }
      filteredArrNames = [];
      for(let i = 0; i < filteredArr.length; i++) {
        filteredArrNames.push(filteredArr[i][0]);
      }

      for (let i = 0; i < filter.length; i++) {
        if(!filteredArrNames.includes(filter[i])) {  
            filteredArrNames.push(filter[i]);
            filteredArr.push([filter[i],"\t" + 0  + ";", "\t" + 0]); 
        }
      }

      //sorting the array

      const sortedArr = filteredArr.sort((a, b) => {
        return filter.indexOf(a[0]) - filter.indexOf(b[0]);
      });



      sortedArr.forEach(i => {
        console.log(i.toString());
    })
      
}



function foodQuery(foodAction, apiKey, queryItem) {
    const XMLHttpRequest = require('xhr2');
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        
        if(xmlhttp.readyState == XMLHttpRequest.DONE) {
            if(xmlhttp.status == 200) {
                const res = JSON.parse(xmlhttp.responseText);
                console.log(res.description) // FoodName
                foodNutrients = res.foodNutrients;
                let tmp = processFoodData(foodNutrients);
                filterNutrientData(tmp)
                
            }
        }
    } 

    xmlhttp.open("GET",`https://api.nal.usda.gov/fdc/v1/${foodAction}?api_key=${apiKey}&query=${queryItem}`, true);
    xmlhttp.send();
}


foodQuery(foodAction, apiKey, queryItem);