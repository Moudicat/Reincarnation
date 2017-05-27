<template>
  <div id="app">
    <r-header/>
    <transition name="fade">
      <keep-alive exclude="Article">
        <router-view/>
      </keep-alive>
    </transition>
    <r-footer/>
    <div id="loader" class="pageload-overlay show">
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="xMidYMid slice">
				<path ref="path" d="M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z"/>
			</svg>
		</div>
  </div>
</template>

<script>
  import Header from 'views/header';
  import Footer from 'views/footer';

  export default {
    name: 'app',
    components: {
      rHeader: Header,
      rFooter: Footer
    },
    mounted() {
      setTimeout(() => {
        let path = 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z';
        this.$refs.path.setAttribute('d', path);
      }, 1000);
    }
  };
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f5f8fa;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
  }

  /*::-webkit-scrollbar-thumb {*/
  /*border-radius: 8px;*/
  /*background-color: rgba(0, 0, 0, .3);*/
  /*}*/
  .padding-top {
    padding-top: 10px;
  }
  .margin-top {
    margin-top: 10px;
  }
  .padding-in {
    padding: 20px !important;
  }

  .fade-leave, .fade-enter-active {
    transition: all .7s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }


  .pageload-overlay {
	  position: fixed;
  	width: 100%;
  	height: 100%;
  	top: 0;
  	left: 0;
  	visibility: hidden;
    z-index: 9999;
  }

  .pageload-overlay.show {
  	visibility: visible;
  }

  .pageload-overlay svg {
  	position: absolute;
  	top: 0;
  	left: 0;
  	pointer-events: none;
    transition: .5s;
  }

  .pageload-overlay svg path {
  	fill: #FFF4F0;
    transition: .5s;
  }
</style>
