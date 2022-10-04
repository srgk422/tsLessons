import { renderBlock } from './lib.js'

const current = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
}
const isYearLeap = current.year % 4 === 0;

const monthMap = [31,isYearLeap ? 29 : 28,31,30,31,30,31,31,30,31,30,31]

const formateDate = (date: number) => {
  const stringifiedDate = date.toString();
  if (stringifiedDate.length > 1) return stringifiedDate;
  return `0${stringifiedDate}`;
};

const getOffsettedDate = (daysOffset: number) => {
  const incrementedDate = current.day + daysOffset;
  const isNextMonth = incrementedDate > monthMap[current.month];
  const incrementedMonth = current.month + (isNextMonth ? 1 : 0);
  const isNextYear = incrementedMonth > 12;

  const newDay = isNextMonth ? (incrementedDate - monthMap[current.month]) : incrementedDate;
  const newMonth = isNextYear ? 1 : incrementedMonth
  const newYear = isNextYear ? current.year + 1 : current.year;

  const formattedDay = formateDate(newDay)
  const formattedMonth = formateDate(newMonth)
  const result = `${newYear}-${formattedMonth}-${formattedDay}`
  return result;
};

const getMinDate = () => {
  const day = formateDate(current.day)
  const month = formateDate(current.month)
  return `${current.year}-${month}-${day}`
};

const getMaxDate = () => {
  const incrementedMonth = current.month + 1;
  const month = incrementedMonth > 12 ? 1 : incrementedMonth;
  const formattedMonth = formateDate(month)
  const year = month === 1 ? current.year + 1 : current.year;
  return `${year}-${formattedMonth}-${monthMap[month]}`;
}

export function renderSearchFormBlock () {
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${getOffsettedDate(1)}" min="${getMinDate()}" max="${getMaxDate()}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${getOffsettedDate(3)}" min="${getMinDate()}" max="${getMaxDate()}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
