var renderer, scene, camera, composer, circle, skelet, particle;

window.onload = function() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableKeys = false;

  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);
  var geometry = new THREE.TetrahedronGeometry(2, 0);
  /*var plane = new THREE.ObjectLoader("https://storage.googleapis.com/at-paperplanes/assets/geometry/plane.json",function(object){
    return object;
  });*/


  var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true; //just to make sure it's all up to date.

  var label = new THREE.Mesh(new THREE.PlaneGeometry, new THREE.MeshBasicMaterial({map:texture}));
  label.lookAt(camera.position);

  var geom = new THREE.IcosahedronGeometry(7, 1);
  var geom2 = new THREE.IcosahedronGeometry(15, 1);
  var geometry2 = new THREE.Geometry();

 var geometry2 = new THREE.Geometry();
 var material = new THREE.MeshPhongMaterial({
   color: 0x27ae60,
   shading: THREE.FlatShading
 });
 // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

/*
var toyPlane = new THREE. ObjectLoader();
 toyPlane.load("./assets/toy-plane.json",function(object){
  object.scale.x=object.scale.y=object.scale.z=20;
  //  var mesh = new THREE.Mesh(geometry, material);
  object.name='toyPlane';
  scene.add(object);
});*/
  for (var i = 0; i < 1500; i++) {

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    //geometry2.vertices.push(mesh.position);
    particle.add(mesh);
  }
  //var line = new THREE.Line( geometry2, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.7 } ) );
  //scene.add( line );
var getVideoTexture =function(){
  // create the video element
              video = document.createElement( 'video' );
              video.src = "./assets/vid.mp4";
              video.load(); // must call after setting/changing source
              video.play();

              var texture = new THREE.VideoTexture( video );
              texture.minFilter = THREE.LinearFilter;
              texture.magFilter = THREE.LinearFilter;
              texture.format = THREE.RGBFormat;
              return texture;
}

  var mat = new THREE.MeshBasicMaterial({
    color: 0xccccc,
    wireframe: true
  });

  var mat2 = new THREE.MeshPhongMaterial({
    color: 0xccccc,
    wireframe: true,
    side: THREE.DoubleSide
  });


  var planet = new THREE.Mesh(geom, mat) ;
  planet.scale.x = planet.scale.y = planet.scale.z = 16;
  circle.add(planet);

  var planet2 = new THREE.Mesh(geom2, mat2);
  planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
  skelet.add(planet2);

  var ambientLight = new THREE.AmbientLight(0xffffff );
  scene.add(ambientLight);

  var lights = [];
lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
lights[0].position.set( 1, 0, 0 );
lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
lights[1].position.set( 0.75, 1, 0.5 );
lights[2] = new THREE.DirectionalLight( 0x8200C, 1 );
lights[2].position.set( -0.75, -1, 0.5 );

scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );
var txt = createLabel();
scene.add(txt);
function createLabel() {
					var canvas = document.createElement("canvas");
					var context = canvas.getContext("2d");
					context.textAlign = "center";
					context.fillRect(0, 0, 600, 300);
					context.fillStyle = "Transparent";
					texture.needsUpdate = true;
					var material = new THREE.MeshBasicMaterial({
						map : getVideoTexture()
					});
					var mesh = new THREE.Mesh(new THREE.PlaneGeometry(600, 300, 10, 10), material);

					return mesh;
				}

  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
var i=1;
function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0050;
  particle.translateZ(2);
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0020;
  renderer.clear();

  renderer.render( scene, camera )
};
