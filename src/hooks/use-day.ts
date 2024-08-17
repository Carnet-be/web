import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

type TDate = string | number | Dayjs | Date | null | undefined;
const useDate = () => {
  return {
    format: (date: TDate) => dayjs(date).format,
    dayjs,
  };
};

export default useDate;
