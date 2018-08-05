/////// PreLoad Images ///////
var preLoad = {
  nProcessed: 0, //number of images checked for pre-load
  percentage: 0,
  yourImages: [], //image array with URLs
  preImages: new Array(),
  check: new Array(),
  loading: {},
  finished: {},
  progress: {},
  success: 0,
  fail: 0,



  //Send image URLs to preload array
  addURL: function(imgURL, imageList) {
    //create URL array from imageList
    for (var i = 0; i <= imageList.length - 1; ++i) {
      preLoad.yourImages[i] = imgURL + imageList[i];
    }
  },

  loadImages: function(loadingDiv, progressDiv, completeFun) {

    this.loading = loadingDiv;
    this.finished = completeFun;
    this.progress = progressDiv;

    if (this.nProcessed < preLoad.yourImages.length) {
      this.preImages[this.nProcessed] = new Image();
      this.preImages[this.nProcessed].onload = function() {
        preLoad.checkLoad();
        preLoad.success++;
      };

      this.preImages[this.nProcessed].onerror = function() {
        preLoad.checkLoad();
        preLoad.fail++;
      };

      this.preImages[this.nProcessed].src = this.yourImages[this.nProcessed];
      }
  },

  checkLoad: function() {
    this.nProcessed++;
    this.percentage = Math.round((preLoad.nProcessed / preLoad.yourImages.length) * 100);
    // add to progress percentage //
    document.querySelector(this.progress).innerHTML = this.percentage + "%";
    // $(this.progress).html(this.percentage + "%");

    // if loading incomplete, continue loading //
    if (preLoad.nProcessed < preLoad.yourImages.length) {
      preLoad.loadImages(this.loading, this.progress, this.finished);
    }

    /// only display "finished" div if the viewer is on the loading screen //
    /// else do nothing on complete ///
    var element = document.querySelector(this.loading);
    var display = element.currentStyle ? element.currentStyle.display :
                              getComputedStyle(element, null).display;
                              
    if (preLoad.nProcessed == preLoad.yourImages.length && (display != 'none')) {
//      (document.querySelector(this.loading)).style.display = 'none';
//      (document.querySelector(this.finished)).style.display = 'block';
        
        preLoad.finished();
      //
      //
      // $(this.loading).hide();
      // $(this.finished).show();
      console.log(preLoad.success);
      console.log(preLoad.fail);
    }
  },

  /// Force a manual check on whether all images are displayed or not //
  manualCheck: function() {
    return preLoad.nProcessed == preLoad.yourImages.length
  }

};
