(function () {
    const pdfContainer = document.getElementById('pdfContainer');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
  
    let currentPage = 1;
    let pdfDoc = null;
  
    const renderPage = (pageNum) => {
      pdfDoc.getPage(pageNum).then(page => {
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
  
        pdfContainer.innerHTML = '';
        pdfContainer.appendChild(canvas);
  
        page.render(renderContext);
      });
    };
  
    const loadPDF = (pdfUrl) => {
      pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        pdfDoc = pdf;
        renderPage(currentPage);
      });
    };
  
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });
  
    nextPageBtn.addEventListener('click', () => {
      if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  
    // Load PDF when the page is ready
    document.addEventListener('DOMContentLoaded', () => {
      loadPDF('Chapters/Chapter1.pdf');
    });
  })();