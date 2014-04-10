// Generated by CoffeeScript 1.7.1
require().defaults.path = "my";

require(function(defines, utils, Game, StageView, PlayerControls, Minimap, InventoryView) {
  return $(function() {
    var c, g, handleInput, invView, minimap, ready, v;
    $('#content').html("<div id=\"stageView\"></div>\n<div id=\"info\"></div>");
    g = new Game();
    g.create();
    v = new StageView($('#stageView'), g);
    c = new PlayerControls(g, v);
    g.onAction(function(a) {
      return v.registerAction(a);
    });
    v.update();
    ready = true;
    minimap = new Minimap($('#info'), g.p.stage());
    minimap.update(true);
    invView = new InventoryView($('#info'), g.p.inventory, c);
    handleInput = function() {
      if (ready) {
        ready = false;
        v.onReady(function() {
          var cmd;
          ready = true;
          minimap.update();
          invView.updateFloor(g.p.cell().item);
          cmd = c.getLastCommand();
          if (cmd != null) {
            g.handleInput(cmd);
            v.update();
            return handleInput();
          }
        });
      }
    };
    return c.onInput(handleInput);
  });
});