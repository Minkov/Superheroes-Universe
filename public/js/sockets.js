 /* globals io $*/

 $(function() {
     var socket = io("http://localhost:3001");
     console.log("asdasd");

     socket.emit("go go", "test");
     socket.on("conn", function(data) {
         console.log(data);
         socket.emit("conn", { my: "data" });
     });
 });