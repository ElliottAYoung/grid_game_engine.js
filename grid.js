// vector class
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
}
Vector.prototype.times = function(factor) {
  return new Vector(this.x + factor, this.y+factor);
}

// environmental objects
function Grass() {
  this.destructible= false;
  this.navigable= true;
  this.terrain_modifier= 0;
  this.hp = 5000000;
  this.src = ("img/grass.png");
}

function Tree(x, y) {
  this.destructible= false; // functionality should be added
  this.navigable= false; // worth exploring functionality
  this.hp = 5000;
  this.src = ("") // need sprite for trees
}

function Brush(x, y) {
  this.destructible= false; // functionality should be added
  this.navigable= true;
  this.terrain_modifier= -1;
  this.hp = 2500;
  this.src = ("") // need sprite for brush
}

// creates game environment
function Tile(x, y, env_obj) {
  this.x = x;
  this.y = y;
  this.position = new Vector(x,y);
  this.terrain = env_obj;
  this.unit = null;
}

function Map() {
  this.grid = new Array ();
  for (var width_count = 0; width_count < map.width; width_count++) {
    this.grid[width_count] = new Array ();
    for (var height_count = 0; height_count < map.height; height_count++) {
      this.grid[width_count].push(new Tile(width_count,height_count,(new Grass())));
    }
  }
  this.mapGen = function() {
    var gridbox = document.getElementById('grid_map');
    console.log(gridbox);
    for (var y_count = 0; y_count > -(map.height); y_count--) {
      for (var x_count = 0; x_count < map.width; x_count++) {
        var grid_tile = document.createElement('div');
        grid_tile.className = "grid";
        grid_tile.id = ("x"+x_count+"y"+y_count);
        gridbox.appendChild(grid_tile);
      }
    }
    gridbox.style.width = ((map.width * 15) + "px");
    gridbox.style.height = ((map.height * 15) + "px");
    var panel = document.getElementsByClassName('ControlPanel')[0];
    panel.style.width = ((map.width * 15) + "px");
  };
}

// clears the whole map
function mapWipe() {
  var grid = document.getElementById('grid_map');
  for (var count = 0; count < (map.height*map.width); count ++){
    grid.removeChild(grid.lastChild);
  }
}

//  units
function Soldier(x, y) {
  this.x = x;
  this.y = y;
  position = new Vector(x,y);
  this.name = "Man at Arms";
  this.hp = 200;
  this.range = 1;
  this.damage = 15;
  // states : 0 = static, 1 = moving, 2 = attacking
  this.state = "static";
  this.speed = 1;
  this.move = move;
  // this.x_to =
  // this.y_to =
  this.src = ("img/manatarms15.gif");
  setImg(x,y,this.src);
}

// sets an img of src at coordinates x,y -- gives node id on line 74
function setImg(x, y, src) {
  var destination_tile = document.getElementById("x"+x+"y"+y);
  var img_tag = document.createElement('img');
  img_tag.src = src;
  img_tag.id = ("img_x"+x+"y"+y);
  destination_tile.appendChild(img_tag);
}

// clears img tag from tile
function clearTile(x, y) {
  var tile = document.getElementById("x"+x+"y"+y);
  var img_tag = document.getElementById("img_x"+x+"y"+y);
  tile.removeChild(img_tag);
}

// clears img on unit's current tile, sets img at new tile
function move(x_to, y_to) {
  clearTile(this.x,this.y);
  var destination_tile = document.getElementById(("x"+x_to+"y"+y_to));
  var img_tag = document.createElement('img');
  img_tag.src = this.src;
  img_tag.id = ("img_x"+x_to+"y"+y_to);
  destination_tile.appendChild(img_tag);
  this.x = x_to;
  this.y = y_to;
}

function findDistance(grid1, grid2) {}
function attack(unit) {}

// contol panel
function ControlPanel() {
  this.x = null;
  this.y = null;
  this.selected = document.getElementById("selected_name");
  this.coordinates = document.getElementById("selected_coordinates");
  this.hp = document.getElementById("selected_hp");
  this.damage = document.getElementById("selected_damage");
  this.speed = document.getElementById("selected_speed");
  this.update = function () {this.coordinates.innerHTML = (this.x + ", "+ this.y);} // expand!!
  this.clear = function (){};
  this.select = function(x, y) {this.x = x; this.y = y; this.update()};
}

// map size settings
var map = {
  width: 35,
  height: 25,
}

// driving
// game_map = new Map();
// game_map.mapGen();
// manAtArms1 = new Soldier(2,-4);
// manAtArms2 = new Soldier(2,-3);
// manAtArms3 = new Soldier(2,-2);
// console.log(game_map.grid)