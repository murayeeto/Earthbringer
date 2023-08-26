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

      // Calculate scale based on container width and page width
      var containerWidth = pdfContainer.clientWidth;
      var scale = containerWidth / page.getViewport({ scale: 1 }).width;
      var viewport = page.getViewport({ scale: scale });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      pdfContainer.innerHTML = ''; // Clear previous content
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

  // Load PDF when the page is ready PLEASE WORK???
  document.addEventListener('DOMContentLoaded', function () {
    loadPDF('ChapterList/Chapter1.pdf');
  });
})();