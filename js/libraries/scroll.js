/*
 *  スクロールを監視するクラス
 *  @params els: String => HTMLエレメントのクラスやidを指定
 *  @params cb: Function => 交差割合が変わったときに実行されるコールバック関数
 *  @params options => オプション
 *    root：基準の要素。デフォルトはブラウザ画面。
 *    rootMargin：交差を計算する際は、実際は基準要素の領域にここで指定した余白値を足した領域が計算基準となる。
 *                例えばここに正の値を指定すれば、実際に見える前に交差していると判定させることができる。
 *                デフォルトはゼロ。
 *    threshold：コールバックを実行する交差の閾値リスト。交差の割合が閾値を上回るか下回ったときのみコールバック関数が実行される。
 *               デフォルトは見えている割合が0％および100％を上回るか下回ったときにコールバックが実行される。
 *    once：デフォルトは1度だけ実行する。falseにすると無限に実行する。
 */
class ScrollObserver {
  constructor(els, cb, options) {
    this.els = document.querySelectorAll(els);
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
      once: true,
    };
    this.cb = cb;
    this.options = Object.assign(defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }

  _init() {
    const callback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.cb(entry.target, true);
          this.once ? observer.unobserve(entry.target) : null;
        } else {
          this.cb(entry.target, false);
        }
      });
    };
    this.io = new IntersectionObserver(callback.bind(this), this.options);
    this.io.POLL_INTERVAL = 100;

    this.els.forEach((el) => this.io.observe(el));
  }

  destroy() {
    this.io.disconnect();
  }
}
