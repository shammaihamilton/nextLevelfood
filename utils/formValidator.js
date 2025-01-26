const formValidator = {
    isInvalidText: function (text) {
      return !text || text.trim().length === 0;
    },
  
    getValuesFromMeal: function (meal) {
      const filteredValues = Object.entries(meal)
        .filter(([key, value]) => key !== "image" && typeof value === "string")
        .map(([, value]) => value);
  
      console.log("Filtered values for validation:", filteredValues);
      return filteredValues;
    },
  
    validateMealData: function (meal) {
      const values = this.getValuesFromMeal(meal);
      return values.some(this.isInvalidText); 
    },
  };
  
  export default formValidator;
  