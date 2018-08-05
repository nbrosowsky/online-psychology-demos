/// PAGINATION.JS ///

/// by default, pagination.setup() looks for divs with class "page" within class "book"
/// optionally, you can provide pagination.setup() an array of page ids to customize order
/// e.g., pagination.setup(["page4","page2","page1"])

/// requires buttons with ids "pageUp" and "pageDown"
/// pagination.pageUp() & pagination.pageDown() manually changes pages
var pagination = {
  currentPage: "",
  firstPage: "",
  lastPage: "",
  ids: [],


  setup: function(pageOrderArray) {
    if (typeof pageOrderArray === 'undefined') {
      var el = document.querySelectorAll(".book .page");
      for (i = 0; i <= el.length - 1; i++) {
        this.ids.push(el[i].id)
      };
    } else {
      this.ids = pageOrderArray;
    }

    this.currentPage = 0;
    this.firstPage = 0;
    this.lastPage = this.ids.length-1;

    $("#" + this.ids[0]).show();
    $("#pageDown").hide();
    for (i = 1; i <= this.ids.length; i++) {
      $("#" + this.ids[i]).hide();
    }

    $("#pageUp").click(function() {
      pagination.pageUp();
    });
    $("#pageDown").click(function() {
      pagination.pageDown();
    });

  },

  pageUp: function() {
    $("#pageDown").show();
    $("#" + this.ids[this.currentPage]).hide();
    pagination.currentPage++;
    $("#" + pagination.ids[this.currentPage]).show();
    if (this.currentPage === this.lastPage) {
      $("#pageUp").hide();
    }
  },

  pageDown: function() {
    $("#" + this.ids[this.currentPage]).hide();
    this.currentPage--;
    $("#" + this.ids[this.currentPage]).show();
    $("#pageUp").show();
    if (this.currentPage === this.firstPage) {
      $("#pageDown").hide();
    }
  }
}
