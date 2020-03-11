//url由你自己设置，我将原本的url删掉了，换上你自己要上传的地址
//var url = 'http://192.168.1.135:8080/tl-finance-manage/app/qualityCheck/uploadOne';

var task;
var photos = [];
var videos = [];
var basePhotos = [];
var this_phoneNum = localStorage.getItem('phoneNum');

var max = 9; //照片的最大数目
var photosNum;
var camera_photos = [];
var gallery_photos = [];
var video_photos = [];
var galleryvideo_photos = [];

function createUploader() {
	task = plus.uploader.createUpload('http://10.0.0.195:8080/app/foreign/uploadFiles', {
		method: 'POST'
	}, function(r) {
		console.log(JSON.stringify(r))
	});
}
// var finishs = document.getElementById('finish');
//  finishs.addEventListener('tap', function() {
//  	var files;
//  	var len = photos.length;
//  	task.addData('uuidDept', 123456789)
//  	task.addData('uuidQua', 1111111111)
//  	task.addData('moduleName', 'users')
// 
//  	for (var i = 0; i < len; i++) {
//  		var j = i + 1;
//  		var temp = 'phone' + j;
//  		task.addFile(photos[i].path, {
//  			key: "file" + temp
//  		});
//  	}
//  	console.log(task.addData)
//  	console.log(task.addFile)
//  	task.start();
//  	plus.nativeUI.showWaiting();
//  });


//从相机中选取图片
function clickCamera() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.gallery.save(e);
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var path = entry.toLocalURL();
			console.log(path)
			var name = path.substr(e.lastIndexOf('/') + 1);
			// insertPhoto(path);
			//压缩图片到内存
			plus.zip.compressImage({
				src: path,
				dst: '_doc/' + path,
				quality: 20,
				overwrite: true
			}, function(zip) {
				console.log(zip)
				camera_photos.push({
					path: zip.target
				});
				photos.push({
					path: zip.target
				});
				showPhotos();
			}, function(error) {
				console.log("压缩error");
			});

		}, function(e) {
			mui.toast("读取拍照文件错误" + e.message);
		});
	})
};

//录像
function clickVideo() {
	var b = plus.camera.getCamera();
	b.startVideoCapture(function(e) {
		plus.gallery.save(e);
		plus.io.resolveLocalFileSystemURL(e, function(entry) {

			var path = entry.toLocalURL();
			console.log(path)
			var name = path.substr(e.lastIndexOf('/') + 1);
			video_photos.push({
				path: path

			})
			videos.push({
				path: path
			});

			showvideos();


		}, function(e) {
			mui.toast("读取拍照文件错误" + e.message);
		});
	})
};

//本地视频选择 

//本地相册选择视频 

function galleryVideo() { // 从相册中选择图片

	plus.gallery.pick(function(e) { //打开相册后，回调的文件路径e

		var path = e;
		galleryvideo_photos.push({
			path: path

		})
		videos.push({
			path: path
		});
		showvideos()
	}, function(e) {
		mui.toast("您取消了选择录像");
	}, {
		filter: "video", //只打开视频，但是不知道为什么有其他选项
		multiple: false,
		system: false, //不用系统自带的打开相册功能

	});
}

//确定还可以从相册中选择照片的最大数目  
var galleryPhotoNum;
var galleryFiles;

function clickGallery() {
	galleryPhotoNum = max - camera_photos.length;
	plus.gallery.pick(function(path) {
			galleryFiles = path.files;
			console.log(galleryFiles)
			plus.nativeUI.showWaiting();
			compressImg(galleryFiles, 0);
			// for (var i in galleryFiles) {
			// 	//将图片放在页面上
			// 	// console.log(galleryFiles[i])
			// 	insertPhoto(galleryFiles[i]);
			// }
		},
		function(e) {
			console.log("获取照片失败");
			// alert("获取照片失败")
		}, {
			filter: "image",
			multiple: true,
			maximum: galleryPhotoNum,
			system: true,
			onmaxed: function() {
				mui.toast('最多选' + galleryPhotoNum + '个');
			},
			popover: true,
			selected: galleryFiles
		});
}

// function insertPhoto(data) {
// 	// console.log(111)
// 	var imgClass; //img的class名
// 	//创建image对象并转换base64码
// 	var img = new Image();
// 	img.src = data;
// 	img.onload = function() {
// 		//创建canvas画布
// 		var canvas = document.createElement("canvas");
// 		//在css中不要直接给img设置宽高,否则此处会获取到css设置的值
// 		var width = img.width;
// 		var height = img.height;
// 		//比较图片宽高设置图片显示和canvas画布尺寸
// 		if (width > height) {
// 			imgClass = 'height';
// 			if (width > 293) {
// 				height = Math.round(height *= 293 / width);
// 				width = 293;
// 			}
// 		} else {
// 			imgClass = 'width';
// 			if (height > 200) {
// 				width = Math.round(width *= 200 / height);
// 				height = 200;
// 			}
// 		}
// 		canvas.width = width; //设置新的图片的宽度
// 		canvas.height = height; //设置新的图片的长度
// 		var ctx = canvas.getContext("2d");
// 		ctx.drawImage(img, 0, 0, width, height); //绘图
// 		var dataURL = canvas.toDataURL("image/png"); //供img标签使用的src路径
// 		//将最后拿到的图片类名和src放入页面中
// 		// console.log(dataURL)
// 		basePhotos.push({
// 			base:dataURL
// 		});
// 	}
// }

//递归压缩图片
function compressImg(files, file_index) {
	var file_length = files.length;
	var path = files[file_index];
	plus.zip.compressImage({
		src: path,
		dst: '_doc/' + path,
		quality: 20,
		overwrite: true
	}, function(zip) {
		var next_file_index = file_index + 1;
		if (file_index == 0) {
			gallery_photos = [];
		}
		gallery_photos.push({
			path: zip.target
		});
		addPhoto(zip.target, file_index);
		if (next_file_index < file_length) {
			compressImg(files, next_file_index);
		} else {
			showPhotos();
		}
	})
}

function addPhoto(imgPath, index) {
	if (index == 0) {
		photos = [];
		for (var i = 0; i < camera_photos.length; i++) {
			photos.push({
				path: camera_photos[i].path
			});
		}
	}
	photos.push({
		path: imgPath
	});

}

function showPhotos() {
	var pic = document.getElementById('photos');
	var table = document.getElementById('picker');
	var len = photos.length;
	if (len > max) {
		len = max;
	}
	console.log(photos.length)
	// table.previousSibling.innerHTML = "";
	console.log(len)
	for (var i = 0; i < len; i++) {
		var place = document.createElement('li');
		place.setAttribute('class', 'image-item space');

		var img = document.createElement('img');
		img.src = photos[i].path;
		img.setAttribute("data-preview-src", ""),
			img.setAttribute("data-preview-group", "1")

		//删除图片
		var closeButton = document.createElement('em');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		place.appendChild(img);
		place.appendChild(closeButton);
		pic.insertBefore(place, table);

	}
	$('#photos').delegate('.image-close', 'tap', function() {
		console.log($(this).parent().index())
		photos.splice($(this).parent().index(), 1);
		console.log(photos.length)

		galleryFiles.splice(($(this).parent().index()), 1);
		console.log(galleryFiles.length)

		$(this).parent().remove();


	});
	plus.nativeUI.closeWaiting();

}

function showvideos() {
	var table = document.body.querySelector('#video');
	var len = videos.length;
	if (len > max) {
		len = max;
	}
	table.innerHTML = "";
	for (var i = 0; i < len; i++) {
		var place = document.createElement('div');
		console.log(place)
		place.setAttribute('class', 'video-item space');

		var video = document.createElement('video');
		video.src = videos[i].path;

		video.controls = true;
		console.log(video.controls);
		console.log(video.src)


		//删除视频
		var closeButton = document.createElement('em');
		closeButton.setAttribute('class', 'video-close');
		closeButton.innerHTML = 'X';

		place.appendChild(video);
		place.appendChild(closeButton);

		table.appendChild(place)
	}

	$('#video').delegate('.video-close', 'tap', function() {

		videos.splice($(this).parent().index(), 1);
		console.log(videos.length)


		$(this).parent().remove();

	});
	plus.nativeUI.closeWaiting();
	// 	if(len == max) {
	// 		document.getElementById('pick').style.display = 'none';
	// 	} else if(len < max) {
	// 		document.getElementById('pick').style.display = 'block';
	// 	}
}
