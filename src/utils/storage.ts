export default {
  setItem: (key: string, val: any) => {
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    try {
      localStorage.setItem(key, val);
    } catch (error) {
      console.log("error saving data", val);
    }
  },

  getItem: (key: string) => {
    try {
      let val = localStorage.getItem(key);
      if (val !== null) {
        try {
          val = JSON.parse(val);
        } catch (e) {}
        return val;
      }
    } catch (err) {
      return null;
    }
  },

  removeItem: async (key: string) => {
    return localStorage.removeItem(key);
  },
};
