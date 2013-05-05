		/**
      * Take picture with camera
      */
      function takePicture() {
		  navigator.camera.getPicture(uploadPicture, onFail, {
		  quality: 50,
		  destinationType: Camera.DestinationType.FILE_URI
		  });
	
		  function onSuccess(imageURI) {
		  var img = document.getElementById('camera_image');
		  img.style.visibility = "visible";
		  img.style.display = "block";
		  img.src = imageURI;
		  document.getElementById('camera_status').innerHTML = "Success";
		  }
	
		  function onFail(message) {
		  console.log("Error getting picture: " + message);
		  document.getElementById('camera_status').innerHTML = "Error getting picture.";
		  }
      };

      /**
      * Select picture from library
      */
      function selectPicture() {
			  navigator.camera.getPicture(uploadPicture, onFail, {
			  quality: 50,
			  destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		  })
		  function onSuccess(imageURI) {
			  var img = document.getElementById('camera_image');
			  img.style.visibility = "visible";
			  img.style.display = "block";
			  img.src = imageURI;
			  document.getElementById('camera_status').innerHTML = "Success";
		  }
	
		  function onFail(message) {
			  console.log("Error getting picture: " + message);
			  document.getElementById('camera_status').innerHTML = "Error getting picture.";
		  }
      };

      /**
      * Upload current picture
      */
      function uploadPicture(imageURI) {

      server = document.getElementById('serverUrl').value;

      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;

      var ft = new FileTransfer();
      ft.upload(imageURI, "http://eiran.fi/App/upload.php", win, fail, options);

      document.getElementById('camera_status').innerHTML = "Uploading..";
	  $('#popup').dialog('close');
      }

      function win(r) {
      document.getElementById('camera_status').innerHTML = "Image was successfully uploaded!";
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      }

      function fail(error) {
      document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
      }

      /**
      * View pictures uploaded to the server
      */
      function viewUploadedPictures() {

      // Get server URL
      server = document.getElementById('serverUrl').value;
      if (server) {

      // Get HTML that lists all pictures on server using XHR
      var xmlhttp = new XMLHttpRequest();

      // Callback function when XMLHttpRequest is ready
      xmlhttp.onreadystatechange=function(){
      if(xmlhttp.readyState === 4){

      // HTML is returned, which has pictures to display
      if (xmlhttp.status === 200) {
      document.getElementById('server_images').innerHTML = xmlhttp.responseText;
      }

      // If error
      else {
      document.getElementById('server_images').innerHTML = "Error retrieving pictures from server.";
      }
      }
      };
      xmlhttp.open("GET", server , true);
      xmlhttp.send();
      }
      }