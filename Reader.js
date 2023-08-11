(function () {
  var pdfContainer = document.getElementById('pdfContainer');
  var prevPageButton = document.getElementById('prevPage');
  var nextPageButton = document.getElementById('nextPage');
  
  var currentPage = 1;
  var pdfDoc = null;
  
  var renderPage = function (num) {
    pdfDoc.getPage(num).then(function (page) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var viewport = page.getViewport({ scale: 1.0 });
  
      // Set canvas dimensions based on container size
      var containerWidth = pdfContainer.clientWidth - 40; // Adjust for padding
      var scale = containerWidth / viewport.width;
      canvas.height = viewport.height * scale;
      canvas.width = containerWidth;
  
      pdfContainer.innerHTML = '';
      pdfContainer.appendChild(canvas);
  
      page.render({ canvasContext: context, viewport: viewport });
    });
  };
  
  var loadPDF = function (pdfUrl) {
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc_) {
      pdfDoc = pdfDoc_;
      renderPage(currentPage);
    });
  };
  
  prevPageButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });
  
  nextPageButton.addEventListener('click', function () {
    if (currentPage < pdfDoc.numPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });
  
  // Load PDF when the page is ready
  document.addEventListener('DOMContentLoaded', function () {
    loadPDF('Chapters/Chapter1.pdf');
  });
  })();