const DateHelper = {
  convertMonthId: id => {
    switch (id) {
      case 0:
        return "Januari";
      case 1:
        return "Februari";
      case 2:
        return "Maret";
      case 3:
        return "April";
      case 4:
        return "Mei";
      case 5:
        return "Juni";
      case 6:
        return "Juli";
      case 7:
        return "Agustus";
      case 8:
        return "September";
      case 9:
        return "Oktober";
      case 10:
        return "November";
      case 11:
        return "Desember";
      default:
        break;
    }
  },
  convertDayId: id => {
    switch (id) {
      case 0:
        return "Minggu";
      case 1:
        return "Senin";
      case 2:
        return "Selasa";
      case 3:
        return "Rabu";
      case 4:
        return "Kamis";
      case 5:
        return "Jumat";
      case 6:
        return "Sabtu";

      default:
        break;
    }
  },
};

export default DateHelper;
