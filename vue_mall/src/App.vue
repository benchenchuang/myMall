<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/font-awesome.min.css';
.flex_box{
    display: flex;
    display: -webkit-flex;
}
.flex_item{
    flex: 1;
    -webkit-flex:1;
}
* {
	padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
}
body {
	font-size: 12px;
    line-height: 1.5;
    font-family: arial,georgia,verdana,helvetica,sans-serif,"Source Sans Pro", "Helvetica Neue";
    -webkit-font-smoothing: antialiased;
    padding-top: constant(safe-area-inset-top);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-bottom: constant(safe-area-inset-bottom);
}
ul, ol {
	list-style: none;
}
h1,h2,h3,h4,h5,h6 {
	font-weight: normal;
	font-size: 100%;
}
a img {
	border: none;
}
img {
	vertical-align: top;
}
b,strong {
	font-weight: normal;
}
i,em {
	font-style: normal;
}
.clearfix:after {
	display: block;
	content: '';
	clear: both;
}
.clearfix {
	zoom: 1;
}
input {
	outline: none;
    border: none;
    background: none;
}
textarea {
	resize: none;
	outline: none;
}
table {
	border-collapse: collapse;
}

td,th {
	border: 1px solid #CCC;
}
a{
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	-moz-tap-highlight-color: rgba(0, 0, 0, 0);
	-ms-tap-highlight-color: rgba(0, 0, 0, 0);
	-o-tap-highlight-color: rgba(0, 0, 0, 0);
	tap-highlight-color: rgba(0, 0, 0, 0);
	text-decoration: none;
	color: #333;
}
::-webkit-input-placeholder{
    　color: #acacac;
}
</style>
