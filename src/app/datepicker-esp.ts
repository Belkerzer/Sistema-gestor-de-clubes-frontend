// locale configuration
// locale : Spanish [es]

import { Injectable } from '@angular/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';

import * as moment from 'moment';
import './moment.es.ec';


/** Datepicker data that requires internationalization. */
@Injectable({ providedIn: 'root' })
export class DatepickerEsp extends MatDatepickerIntl {
  constructor() {
    super();
    moment.locale('es-EC');
  }

  /** A label for the calendar popup (used by screen readers). */
  calendarLabel = 'Calendario';

  /** A label for the button used to open the calendar popup (used by screen readers). */
  openCalendarLabel = 'Abrir calendario';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Mes anterior';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Mes siguiente';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Año anterior';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Año siguiente';

  /** A label for the 'AM' button (used by screen readers). */
  setToAMLabel = 'Fijar hora a AM';

  /** A label for the 'PM' button (used by screen readers). */
  setToPMLabel = 'Fijar hora a PM';

  /** A label for the 'switch to minute view' button (used by screen readers). */
  switchToMinuteViewLabel = 'Cambiar a vista de minutos';

  /** A label for the 'switch to hour view' button (used by screen readers). */
  switchToHourViewLabel = 'Cambiar a vista de horas';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Cambiar a vista del mes';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToYearViewLabel = 'Cambiar a vista de año';

  /** A label for the 'switch to years view' button (used by screen readers). */
  switchToYearsViewLabel = 'Cambiar a vista de años';

  /** Text for the 'submit' button. */
  buttonSubmitText = 'Ok';

  /** A label for the 'submit' button (used by screen readers). */
  buttonSubmitLabel = 'Elegir la fecha seleccionada';

  /** Text for the 'cancel' button. */
  buttonCancelText = 'Cancelar';

  /** A label for the 'cancel' button (used by screen readers). */
  buttonCancelLabel = 'Cancelar la selección de fecha';
}
