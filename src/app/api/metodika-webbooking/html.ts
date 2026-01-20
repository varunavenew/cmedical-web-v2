export function createMetodikaHtml({
  language,
  locationGroup,
  tagManagerCode,
  hasPreselectedCity,
}: {
  language: string;
  locationGroup: "nor" | "eng";
  tagManagerCode: string;
  hasPreselectedCity: boolean;
}) {
  return `<!DOCTYPE html>
<html lang=${language}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>metodika-webbooking</title>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${tagManagerCode}');</script>

  <script>
    window.dataLayer.push({ booking_method: "metodika" });
  </script>

  <style>
    body.modal-open {
      /* Make our iframe resizer min height workaround work */
      overflow: auto !important;
      position: static !important;

      /* Fix for the page width changing when the modal is open */
      width: auto !important;
    }

    /* Hide the city and clinic dropdowns if we have preselected a city */
    #metodika-container[data-has-preselected-city="true"] #filter-1,
    #metodika-container[data-has-preselected-city="true"] #filter-3 {
      display: none;
    }
  </style>
</head>

<body>
  <div id="metodika-container" data-has-preselected-city="${hasPreselectedCity}">
    <div id="metodika-webbooking" data-metodika-system="cme" data-metodika-location-group="${locationGroup}"></div>
  </div>

  <script>
    window.addEventListener("successfulbooking", handleBookingCompleted);

    // This script sets the min height style of the body to be equal to the height of the tallest open modal.
    // We do this because the iframe resizer script can't correctly determine the height of the iframe
    // when modals with fixed position are open.
    const modals = [];

    // Continuously check for injected modal DOM elements
    (function check() {
      const elements = document.querySelectorAll(".modal");
      for (const element of elements) {
        addModalContainer(element);
      }

      if (modals.length == 0) {
        setTimeout(check, 0);
      }
    })();

    function addModalContainer(container) {
      const dialog = container.querySelector(".modal-dialog");
      if (dialog == null) {
        console.error("Could not find dialog within modal container", container);
        return;
      }

      modals.push({
        container,
        dialog,
        height: 0
      });

      const resizeObserver = new ResizeObserver(handleResizeObserved);
      resizeObserver.observe(dialog);
    }

    function handleResizeObserved(entries) {
      for (const entry of entries) {
        const modal = modals.find(modal => modal.dialog === entry.target);
        if (modal == null) {
          console.error("Could not find modal in modals array", entry.target);
          return;
        }

        modal.height = getModalHeight(modal);
      }

      adjustBodyMinHeight();
    }

    // Calculate modal height, including block margins
    function getModalHeight(modal) {
      if (modal.container.style.display !== "block") {
        return 0;
      }

      const dialogHeight = modal.dialog.getBoundingClientRect().height;
      const dialogStyle = window.getComputedStyle(modal.dialog);
      const marginTop = parseFloat(dialogStyle["margin-top"]);
      const marginBottom = parseFloat(dialogStyle["margin-bottom"]);

      return dialogHeight + marginTop + marginBottom;
    }

    // Set body's min height to be equal to the tallest open modal
    function adjustBodyMinHeight() {
      let maxModalHeight = 0;
      for (const modal of modals) {
        maxModalHeight = Math.max(maxModalHeight, modal.height);
      }

      if (maxModalHeight > 0) {
        document.body.style.minHeight = \`\${maxModalHeight}px\`;
      } else {
        document.body.style.minHeight = "";
      }
    }

    function handleBookingCompleted() {
      window.parent.postMessage({ event: "booking-completed" }, "*");
    }
  </script>

  <script>
    (function(){
      var script = document.createElement( 'script' );
      script.src = 'https://ws.metodika.com/skalpell/ws/wb3/frontend/wb3init.js?rnd=' + Math.random();
      document.body.appendChild( script );
    }());
  </script>
  <script src="/@iframe-resizer/child@5.1.2/index.umd.js"></script>
</body>
</html>`;
}
