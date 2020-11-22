iziToast.show({
  theme: "dark",
  icon: "icon-person",
  title: "Hey",
  message: "Welcome!",
  position: "center", // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
  progressBarColor: "rgb(0, 255, 184)",
  buttons: [
    [
      "<button>Ok</button>",
      function (instance, toast) {
        alert("Hello world!");
      },
      true,
    ], // true to focus
    [
      "<button>Close</button>",
      function (instance, toast) {
        instance.hide(
          {
            transitionOut: "fadeOutUp",
            onClosing: function (instance, toast, closedBy) {
              console.info("closedBy: " + closedBy); // The return will be: 'closedBy: buttonName'
            },
          },
          toast,
          "buttonName"
        );
      },
    ],
  ],
  onOpening: function (instance, toast) {
    console.info("callback abriu!");
  },
  onClosing: function (instance, toast, closedBy) {
    console.info("closedBy: " + closedBy); // tells if it was closed by 'drag' or 'button'
  },
});
