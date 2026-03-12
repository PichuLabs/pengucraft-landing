import './style.css'

// --- Configuration ---
var SERVER_ADDRESS = 'play.PenguCraft.com';
var SERVER_START = new Date(2026, 1, 26); // February 26, 2026
var ONLINE_UPDATE_INTERVAL = 600000; // 10 minutes

// --- Online Count ---
function updateOnline() {
  fetch('https://api.mcsrvstat.us/2/' + SERVER_ADDRESS)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.online) {
        var current = data.players.online;
        var max = data.players.max;
        document.getElementById('onlineValue').innerHTML =
          current + ' <span class="cap">/ ' + max + '</span>';
      } else {
        document.getElementById('onlineValue').innerHTML =
          '0 <span class="cap">/ —</span>';
      }
    })
    .catch(function() {
      document.getElementById('onlineValue').innerHTML =
        '0 <span class="cap">/ —</span>';
    });
}
updateOnline();
setInterval(updateOnline, ONLINE_UPDATE_INTERVAL);

// --- Server Age ---
function updateServerAge() {
  var now = new Date();
  var diff = now - SERVER_START;
  var days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  document.getElementById('serverAge').textContent = days + (days === 1 ? ' day' : ' days');
}
updateServerAge();

// --- Copy IP ---
function copyIP() {
  var ip = 'play.PenguCraft.com';
  var btn = document.querySelector('.server-ip');
  var tooltip = document.getElementById('copyTooltip');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(ip);
  } else {
    var ta = document.createElement('textarea');
    ta.value = ip;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  btn.classList.add('copied');
  tooltip.textContent = 'IP Copied!';
  tooltip.classList.add('show');
  setTimeout(function () {
    btn.classList.remove('copied');
    tooltip.classList.remove('show');
  }, 2000);
}

// Expose copyIP globally so the onclick in HTML can call it
window.copyIP = copyIP;
