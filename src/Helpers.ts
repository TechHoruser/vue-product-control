// eslint-disable-next-line import/prefer-default-export
export function formatDateForOrder(date: Date): string {
  const year = String(date.getFullYear());
  const month = ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1);
  const day = (date.getDate() > 9 ? '' : '0') + date.getDate();
  return `${year}${month}${day}`;
}

export function customSort(value: [], sortBy: string, sortOrder: string): [] {
  return value.sort((a: any, b: any) => {
    if (typeof a[sortBy] === 'number') {
      if (sortOrder === 'desc') {
        return (a[sortBy] < b[sortBy]);
      }

      return (b[sortBy] > a[sortBy]);
    }
    if (a[sortBy] instanceof Date) {
      if (sortOrder === 'desc') {
        return formatDateForOrder(a[sortBy]).localeCompare(formatDateForOrder(b[sortBy]));
      }

      return formatDateForOrder(b[sortBy]).localeCompare(formatDateForOrder(a[sortBy]));
    }

    if (sortOrder === 'desc') {
      return a[sortBy].localeCompare(b[sortBy]);
    }

    return b[sortBy].localeCompare(a[sortBy]);
  });
}
