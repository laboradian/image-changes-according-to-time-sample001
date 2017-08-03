import moment from 'moment';

/**
 *
 *
 * Usage:
 *   const bgCreator = new BackgroundCreator();
 *   bgCreator.update();
 *   elmObj.style.backgroundColor = bgCreator.getBackgroundColorString();
 *
 */
class BackgroundCreator {
  constructor() {
    this.HOUR_EVENING_START = 18; // 夕方が始まる時間
    this.HOUR_NIGHT_START = 19; // 夜が始まる時間
    this.HOUR_DAYTIME_START = 7; // 朝(昼間)が始まる時間
    this.R;
    this.G;
    this.B;
    this.A;
    this.dt; // momentオブジェクト
    this.month;
    this.date;
    this.hour;

    this.dtDaytimeStart; // 昼間スタートのmomentオブジェクト
    this.dtEveningStart; // 夕方スタートのmomentオブジェクト
    this.dtNightStart;   // 夜スタートのmomentオブジェクト

    // 時間帯種類
    // 1: 夜から朝に変化中,   2:朝(昼間)から夕方に変化中,
    // 3: 夕方から夜に変化中, 4: 夜
    // 0: それ以外
    this.time_type = 0;
    this.TIME_TYPE_CHANGE_TO_NOTHING = 0;
    this.TIME_TYPE_CHANGE_TO_MORNING = 1;
    this.TIME_TYPE_CHANGE_TO_EVENING = 2;
    this.TIME_TYPE_CHANGE_TO_NIGHT = 3;
    this.TIME_TYPE_NIGHT = 4;

    // 夜から朝（昼間）に変化するのに掛ける時間[時間]
    this.HOURS_FROM_NIGHT_TO_DAYTIME = 1;
    // 昼間から夕方に変化するのに掛ける時間[時間]
    this.HOURS_FROM_DAYTIME_TO_EVENING = 1;

    this.DAYTIME_COLOR = {
      R: 0,
      G: 0,
      B: 0,
      A: 0
    };
    this.EVENING_COLOR = {
      R: 157,
      G: 114,
      B: 21,
      A: 0.2
    };
    this.NIGHT_COLOR = {
      R: 0,
      G: 0,
      B: 0,
      A: 0.4
    };
    this.currentColor = {
      R: null,
      G: null,
      B: null,
      A: null
    };
  }

  /**
   * this.currentColor を更新する。
   *
   * @param {object} initMoment - momentオブジェクト
   */
  update(initMoment) {
    if (initMoment) {
      this.dt = initMoment;
    } else {
      // 現在時刻を取得する
      this.dt = moment();
      this.dt.utcOffset('+0900');
    }

    this.month = this.dt.month() + 1;
    this.date = this.dt.date();
    this.hour = this.dt.hour();
    //console.log('dt', this.dt);

    // 夏
    if (this.month >= 7 && this.month <= 9) {
      this.HOUR_DAYTIME_START = 6;
    }

    this.updateTimeType();

    // 各種momentオブジェクトを作成する
    this.dtDaytimeStart = this.dt.clone().hour(this.HOUR_DAYTIME_START).minute(0).seconds(0);
    this.dtEveningStart = this.dt.clone().hour(this.HOUR_EVENING_START).minute(0).seconds(0);
    this.dtNightStart = this.dt.clone().hour(this.HOUR_NIGHT_START).minute(0).seconds(0);

    switch (this.time_type) {
      case this.TIME_TYPE_CHANGE_TO_MORNING:
        this.createBackgroundFromNightToDaytime();
        break;
      case this.TIME_TYPE_CHANGE_TO_EVENING:
        this.createBackgroundFromDaytimeToEvening();
        break;
      case this.TIME_TYPE_CHANGE_TO_NIGHT:
        this.createBackgroundFromEveningToNight();
        break;
      case this.TIME_TYPE_NIGHT:
        this.createBackgroundNight();
        break;
      default:
        // do nothing
        break;
    }
  }

  updateTimeType() {
    if (this.hour >= (this.HOUR_DAYTIME_START - this.HOURS_FROM_NIGHT_TO_DAYTIME) &&
        this.hour < this.HOUR_DAYTIME_START) {
      this.time_type = this.TIME_TYPE_CHANGE_TO_MORNING;
    } else if (this.hour >= (this.HOUR_EVENING_START - this.HOURS_FROM_DAYTIME_TO_EVENING) &&
               this.hour < this.HOUR_EVENING_START) {
      this.time_type = this.TIME_TYPE_CHANGE_TO_EVENING;
    } else if (this.hour >= this.HOUR_EVENING_START && this.hour < this.HOUR_NIGHT_START) {
      this.time_type = this.TIME_TYPE_CHANGE_TO_NIGHT;
    } else if (this.hour >= this.HOUR_NIGHT_START || this.hour < this.HOUR_DAYTIME_START) {
      this.time_type = this.TIME_TYPE_NIGHT;
    } else {
      this.time_type = this.TIME_TYPE_CHANGE_TO_NOTHING;
    }
  }

  /**
   * 夜から朝になる時間帯で、現在の currentColor を生成する
   *
   * this.NIGHT_COLOR の値によってここに実装は変える必要がある。
   */
  createBackgroundFromNightToDaytime() {
    // 朝になるまでの1時間のうち、今何％のところにいるか
    const elapsed_sec = this.dt.unix()
      - (this.dtDaytimeStart.clone().subtract(this.HOURS_FROM_NIGHT_TO_DAYTIME, 'hours').unix());
    const rate = elapsed_sec / (60*60*this.HOURS_FROM_NIGHT_TO_DAYTIME);
    //const currentA = (1 - rate) * this.NIGHT_COLOR.A;
    //this.currentColor = Object.assign({}, this.NIGHT_COLOR, {A: currentA});

    this.currentColor = BackgroundCreator.calcCurrentValueOfColor(
      this.NIGHT_COLOR, this.DAYTIME_COLOR, rate
    );
  }

  /**
   * 昼から夕方になる時間帯で、現在の currentColor を生成する
   *
   * this.EVENING_COLOR の値によってここに実装は変える必要がある。
   */
  createBackgroundFromDaytimeToEvening() {
    // 夕方になるまでの1時間のうち、今何％のところにいるか
    //const minute = this.dt.minute();
    const elapsed_sec = this.dt.unix()
      - (this.dtEveningStart.clone().subtract(this.HOURS_FROM_DAYTIME_TO_EVENING, 'hours').unix());
    const rate = elapsed_sec / (60*60*this.HOURS_FROM_DAYTIME_TO_EVENING);
    //const currentA = this.EVENING_COLOR.A * rate;
    //this.currentColor = Object.assign({}, this.EVENING_COLOR, {A: currentA});

    this.currentColor = BackgroundCreator.calcCurrentValueOfColor(
      this.DAYTIME_COLOR, this.EVENING_COLOR, rate
    );
  }

  /**
   * 夕方から夜になる時間帯で、現在の currentColor を生成する
   * this.EVENING_COLOR と this.NIGHT_COLOR の値によってここに実装は変える必要がある。
   */
  createBackgroundFromEveningToNight() {
    // 夕方から夜になるまでの時間のうち、今何％のところにいるか
    const rate = (() => {
      // 夕方から夜まで何秒あるか
      const full_seconds = this.dtNightStart.unix() - this.dtEveningStart.unix();
      // 夕方から現在時刻まで何秒か
      const current_seconds = this.dt.unix() - this.dtEveningStart.unix();

      return current_seconds / full_seconds;
    })();

    //// R
    //const currentR = (1 - rate) * this.EVENING_COLOR.R;
    //// G
    //const currentG = (1 - rate) * this.EVENING_COLOR.G;
    //// B
    //const currentB = (1 - rate) * this.EVENING_COLOR.B;
    //// A
    //const currentA = this.EVENING_COLOR.A
    //  + ((this.NIGHT_COLOR.A - this.EVENING_COLOR.A) * rate);

    //this.currentColor = {
    //  R: currentR,
    //  G: currentG,
    //  B: currentB,
    //  A: currentA
    //};

    this.currentColor = BackgroundCreator.calcCurrentValueOfColor(
      this.EVENING_COLOR, this.NIGHT_COLOR, rate
    );
  }

  /**
   *
   */
  createBackgroundNight() {
    this.currentColor = Object.assign({}, this.NIGHT_COLOR);
  }

  /**
   *
   */
  getBackgroundColorString() {
    const cc = this.currentColor;
    return `rgba(${parseInt(cc.R)}, ${parseInt(cc.G)}, ${parseInt(cc.B)}, ${cc.A})`;
  }

  /**
   * 現時点での色オブジェクトを返す
   */
  static calcCurrentValueOfColor(startColorObj, endColorObj, rate) {

    const calcCurrentValue = (startValue, endValue, rate) => {
      if (startValue <= endValue) {
        return startValue + ((endValue - startValue) * rate);
      } else {
        return startValue - ((startValue - endValue) * rate);
      }
    };

    return {
      R: calcCurrentValue(startColorObj.R, endColorObj.R, rate),
      G: calcCurrentValue(startColorObj.G, endColorObj.G, rate),
      B: calcCurrentValue(startColorObj.B, endColorObj.B, rate),
      A: calcCurrentValue(startColorObj.A, endColorObj.A, rate)
    };
  }
}

export default BackgroundCreator;
