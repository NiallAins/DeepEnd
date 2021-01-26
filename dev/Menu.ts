import { Engine, Input } from './Bunas';

export default class {
  public open = false;
  public reopenWait = 0;
  private readonly nav: { [event: string]: any } = [
    // Shop
    {
      open: this.nextItem.bind(this),
      w: this.nextItem.bind(this, 'up'),
      a: this.nextItem.bind(this, 'left'),
      s: this.nextItem.bind(this, 'down'),
      d: this.nextItem.bind(this, 'right'),
      sp: this.buyItem.bind(this)
    },
    // Sell
    {
      open: () => this.sellButton.classList.add('selected'),
      close: () => this.sellButton.classList.remove('selected'),
      a: () => 0,
      d: () => 2,
    },
    // Album
    {
      open: this.toggleAlbum.bind(this, true),
      a: this.toggleAlbum.bind(this, false),
      sp: () => 3
    },
    // Photo
    {
      open: this.nextPhoto.bind(this),
      close: this.closePhoto.bind(this),
      a: this.nextPhoto.bind(this, true),
      d: this.nextPhoto.bind(this),
      sp: () => 2,
    }
  ];
  private currentNav = 0;
  private pageBg: string;
  private readonly pageCount: number = 5;
  private el: HTMLDivElement;
  private shop: HTMLDivElement;
  private sellButton: HTMLDivElement;
  private currentItem: number = -1;
  private album: HTMLDivElement;
  private currentPhoto: number = -1;

  constructor() {
    this.pageBg = Engine.getBackground('pageBg').src;

    this.el = document.createElement('div');
    this.el.classList.add('book');
    this.el.style.backgroundImage = 'url(' + this.pageBg + ')';
    document.body.appendChild(this.el);

    [
      '',
      `
        <div class="content">
          <h2>Equipment for Sale</h2>
          <div class="panel-contain">
            <div class="panel"><img src="${Engine.getSprite('shop_fins1').src}"/></div>
            <div class="panel"><img src="${Engine.getSprite('shop_fins2').src}"/></div>
            <div class="panel"><img src="${Engine.getSprite('shop_fins3').src}"/></div>

            <div class="panel"><img src="${Engine.getSprite('shop_tank1').src}"/></div>
            <div class="panel"><img src="${Engine.getSprite('shop_tank2').src}"/></div>
            <div class="panel"><img src="${Engine.getSprite('shop_tank3').src}"/></div>

            <div class="panel"><img src="${Engine.getSprite('shop_torch1').src}"/></div>
            <div class="panel"><img src="${Engine.getSprite('shop_torch2').src}"/></div>
            <div class="panel"><img src="${Engine.getSprite('shop_torch3').src}"/></div>
          </div>
        </div>
      `,
      `
        <div class="content">
          <h2>Rock & Minerals Monthly</h2>
          <div id="sellButton">Sell All</div>
        </div>
      `,
      '',
      `
        <div class="content">
          <h2>Wonders of the Deep</h2>
          <div class="panel-contain">
            <div class="panel md"></div>
            <div class="panel md"></div>
            <div class="panel md"></div>
            <div class="panel md"></div>
            <div class="panel lg"></div>
          </div>
        </div>
      `,
    ].forEach((html, i) => {
      let page = document.createElement('div');
      page.classList.add('page');
      page.innerHTML = html;
      this.el.appendChild(page);

      if (i === 1) {
        this.shop = page.querySelector('.panel-contain') as HTMLDivElement;
      }
    });

    this.album = document.createElement('div');
    this.album.classList.add('album');
    this.el.appendChild(this.album);
    this.sellButton = document.getElementById('sellButton') as HTMLDivElement;

    const
      css = document.createElement('style'),
      anispeed = 0.6,
      c_bg = '#f8f8f8',
      c_border = '#d8d8d8',
      c_selected = '#aaa';

    css.innerText = `
      .book, .page {
        background-repeat: no-repeat;
      }

      .book {
        position: fixed;
        top: 120vh;
        left: calc(50vw - 268px);
        width: 536px;
        height: 713px;
        opacity: 0;
        pointer-events: none;
        perspective: 1500px;
        perspective-origin: 0 50%;
        background-position: 2px bottom; 
        transform: rotate(40deg);
        transition:
          left ${anispeed}s,
          top ${anispeed}s,
          opacity ${anispeed}s,
          transform ${anispeed}s;
      }
      .book.open {
        opacity: 1;
        transform: rotate(0deg);
        top: calc(50vh - 360px);
         transition:
          left ${anispeed}s,
          top ${anispeed}s ease-out,
          opacity ${anispeed}s,
          transform ${anispeed}s;
      }
      .book.turned {
        left: 50vw;
      }

      .page {
        position: absolute;
        top: 0px;
        left: 0;
        width: 527px;
        height: calc(100% - 5px);
        border: 1px solid ${c_border};
        border-radius: 5px;
        background: ${c_bg};
        transform-origin: 0 0;
        transition:
          transform ${anispeed}s linear,
          z-index 0s linear ${anispeed / 2}s;
      }
      .page.turned {
        transform: rotate3d(0, 1, 0, -180deg);
        transition:
          transform ${anispeed},
          z-index 0s ${anispeed / 2}s;
      }
      .page:nth-child(2n) {
        transform: rotate3d(0, 1, 0, 180deg);
        transform-origin: 100% 0;
        left: -529px;
      }
      .page:nth-child(2n).turned {
        transform: unset;
      }
      .page:nth-child(1) {
        background: url('${Engine.getBackground('page0').src}');
        border: none;
      }
      .page:nth-child(2) {
        background: url('${Engine.getBackground('page1').src}');
        border: none;
        left: -527px;
      }

      .album {
        position: absolute;
        top: 30px;
        left: 280px;
        width: 0;
        transition:
          top ${anispeed}s,
          left ${anispeed}s,
          width ${anispeed}s;
      }
      .album.open {
        top: 16px;
        left: -550px;
        width: 550px;
        transition:
          top ${anispeed}s 0.2s,
          left ${anispeed}s 0.2s,
          width ${anispeed}s 0.2s;
      }

      .album img {
        display: none;
        position: absolute;
        left: 0;
        z-index: 25;
        width: 250px;
        height: 188px;
        border: 12px solid white;
        border-bottom-width: 20px;
        box-shadow: 0 5px 10px 4px #0004;
        transition: all ${anispeed}s;
      }
      .album img:nth-child(2n) {
        left: 50%;
      }

      .album.open img.open {
        display: block;
        top: 50px !important;
        left: 30px;
        z-index: 30;
        width: 500px;
        height: 375px;
        border-width: 24px;
        border-bottom-width: 40px;
        transform: rotate(0deg);
        transition: all ${anispeed}s, z-index 0s;
      }

      .content {
        width: calc(100% - 50px);
        margin: 0 auto;
        font-family: "Times New Roman";
        font-size: 20px;
      }
      h2 {
        padding-top: 20px;
        text-align: center;
        font-size: 28px;
        font-weight: 200;
      }
      .panel-contain {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .panel {
        text-align: center;
        border: 2px dashed ${c_border};
        width: 30%;
        height: 125px;
        margin: 25px 0;
      }
      .panel.md {
        width: 45%;
        height: 150px;
        margin: 20px 0;
      }
      .panel.lg {
        width: 100%;
        height: 150px;
      }
      .panel.selected {
        border-color: ${c_selected};
      }
      .panel img {
        filter: grayscale(1);
        transition: filter 0.2s, transform 0.2s;
      }
      .panel.selected img {
        transform: scale(1.2);
        filter: unset;
      }

      #sellButton.selected {
        font-weight: bold;
      }
    `;
    for (let i = 1; i <= this.pageCount; i++) {
      css.innerText += `
        .page:nth-child(${i}) {z-index: ${1 + this.pageCount - i}0;}
        .page:nth-child(${i}).turned {z-index: -${1 + this.pageCount - i}0;}`;
    }
    for (let i = 0; i < 6; i++) {
      css.innerText += `
        .album img:nth-child(${i + 1}) {
          display: block;
          top: ${ Math.floor(i / 2) * 223 }px;
          transform: rotate(${ Math.floor(Math.random() * 20) - 10 }deg);
        }`;
    }
    document.head.appendChild(css);
  }

  public step() {
    if (this.reopenWait > 0) {
      this.reopenWait--;
    }

    if (this.open) {
      [['KeyA', 'a'], ['KeyD', 'd'], ['KeyW', 'w'], ['KeyS', 's'], ['Space', 'sp']]
        .forEach(key => {
          if (Input.key.down === key[0] && this.nav[this.currentNav][key[1]]) {
            let nextNav = this.nav[this.currentNav][key[1]]();
            if (nextNav || nextNav === 0) {
              if (this.nav[this.currentNav].close) {
                this.nav[this.currentNav].close();
              }
              this.currentNav = nextNav;
              if (this.nav[this.currentNav].open) {
                this.nav[this.currentNav].open();
              }
            }
            this.el.setAttribute('state', this.currentNav.toString());
          }
        });
    }
  }

  public openMenu() {
    this.el.classList.add('open');
    this.open = true; 

    setTimeout(() => {
      this.el.classList.add('turned');
      this.el.children[0].classList.add('turned');
      this.el.children[1].classList.add('turned');
    }, 900);
  }

  public closeMenu() {
    this.el.classList.remove('turned');
    this.album.classList.remove('open');
    Array.from(this.el.children).forEach(p => p.classList.remove('turned'));

    setTimeout(() => {
      this.el.classList.remove('open');
      this.open = false;
      this.reopenWait = 40;
    }, 400);
  }

  // Shop
  private nextItem(dir?: string) {
    if (this.currentItem > -1) {
      this.shop.children[this.currentItem].classList.remove('selected');
    }
    if (dir === 'left') {
      this.currentItem -= 1;
      if (this.currentItem < 0) {
        this.currentItem = -1;
        this.closeMenu();
        return;
      }
    } else if (dir === 'right') {
      if ([2, 5, 8].indexOf(this.currentItem) > -1) {
        return 1;
      }
      this.currentItem += 1;
    } else if (dir === 'up') {
      this.currentItem -= this.currentItem > 2 ? 3 : 0;
    } else if (dir === 'down') {
      this.currentItem += this.currentItem < 6 ? 3 : 0;
    }
    if (this.currentItem > -1) {
      this.shop.children[this.currentItem].classList.add('selected');
    }
  }
  private buyItem() {

  }


  // Album
  private toggleAlbum(on: boolean) {
    if (on) {
      this.el.children[2].classList.add('turned');
      this.el.children[3].classList.add('turned');
      this.album.classList.add('open');
      return 2;
    } else {
      this.el.children[2].classList.remove('turned');
      this.el.children[3].classList.remove('turned');
      this.album.classList.remove('open');
      return 1;
    }
  }
  private nextPhoto(prev: boolean = false) {
    if (this.album.children.length === 0) {
      this.closePhoto();
    }
    if (this.currentPhoto !== -1) {
      this.album.children[this.currentPhoto].classList.remove('open');
    }
    this.currentPhoto += prev ? -1 : 1;
    if (this.currentPhoto === -1 || this.currentPhoto === this.album.children.length) {
      this.closePhoto();
    } else {
      this.album.children[this.currentPhoto].classList.add('open');
    }
  }
  private closePhoto() {
    if (this.album.children[this.currentPhoto]) {
      this.album.children[this.currentPhoto].classList.remove('open');
    }
    this.currentPhoto = -1;
    this.currentNav = 1;
  }

  public addPhoto(src: string) {
    let image = document.createElement('img');
    image.src = src;
    this.album.appendChild(image);
  }
}