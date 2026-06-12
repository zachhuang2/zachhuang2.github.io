document.addEventListener('DOMContentLoaded', function () {
  const viewerBackdrop = document.getElementById('pdfViewerBackdrop');
  const viewerIframe = document.getElementById('pdfViewerIframe');
  const viewerTitle = document.getElementById('pdfViewerTitle');
  const viewerDownload = document.getElementById('pdfViewerDownload');
  const viewerClose = document.getElementById('pdfViewerClose');

  function closeViewer() {
    if (!viewerBackdrop) return;
    viewerBackdrop.hidden = true;
    viewerIframe.src = '';
  }

  document.querySelectorAll('.pdf-viewer-link').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const pdfUrl = this.getAttribute('href');
      const title = this.dataset.title || 'PDF Viewer';
      if (!pdfUrl) return;

      if (viewerBackdrop) {
        viewerTitle.textContent = title;
        viewerDownload.href = pdfUrl;
        viewerIframe.src = pdfUrl;
        viewerBackdrop.hidden = false;
      }
    });
  });

  if (viewerClose) {
    viewerClose.addEventListener('click', closeViewer);
  }

  if (viewerBackdrop) {
    viewerBackdrop.addEventListener('click', function (event) {
      if (event.target === viewerBackdrop) {
        closeViewer();
      }
    });
  }

  document.addEventListener('keyup', function (event) {
    if (event.key === 'Escape' && viewerBackdrop && !viewerBackdrop.hidden) {
      closeViewer();
    }
  });
});
