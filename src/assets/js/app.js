document.addEventListener("DOMContentLoaded", () => {

  //= components/

  $('.slider').slick({
    autoplay: true,
    speed: 800,
    lazyLoad: 'progressive',
    arrows: false,
    dots: true,
  }).slickAnimation();

  let acc = document.getElementsByClassName("accordion");

  if (acc) {
    let accordeonContainer = document.querySelector('.accordion-container');
    let initialHeight = accordeonContainer.scrollHeight;
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        let currentlyActiveAccordion = document.querySelector('.accordion.active');
        let panel = this.nextElementSibling;
        let allPanels = document.querySelectorAll('.panel');
        let allPanelTexts = document.querySelectorAll('.panel p');

        if (window.matchMedia("(min-width: 500px)").matches && currentlyActiveAccordion && currentlyActiveAccordion !== this) {
          let activePanel = currentlyActiveAccordion.nextElementSibling;
          let activeTexts = activePanel.querySelectorAll('p');
          activeTexts.forEach(text => text.classList.remove('active-text'));
          currentlyActiveAccordion.classList.remove("active");
          activePanel.style.maxHeight = null;
          accordeonContainer.style.height = initialHeight + "px";
        }

        this.classList.toggle("active");

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.style.marginTop = "0px"
          if (window.matchMedia("(min-width: 500px)").matches) {
            allPanelTexts.forEach(text => text.classList.remove('active-text'));
            accordeonContainer.style.height = initialHeight + "px";
          }

        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.marginTop = "25px"

          if (window.matchMedia("(min-width: 500px)").matches) {
            panel.style.marginTop = "0px"
            setTimeout(() => {
              let texts = panel.querySelectorAll('p');
              texts.forEach(text => text.classList.add('active-text'));
            }, 200);
            accordeonContainer.style.height = panel.scrollHeight + "px";
            allPanels.forEach(p => {
              if (p !== panel) {
                p.style.maxHeight = null;
                p.querySelectorAll('p').forEach(text => text.classList.remove('active-text'));
              }
            });
          }
        }

        
      });
    }

    acc[0].click()
  }

})