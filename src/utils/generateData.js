export function generateData(imageData) {
  return imageData.map((item, idx) => {
    let obj = {};
    obj.id = idx;
    obj.picture = item.filename;
    obj.status = "Published";
    return obj;
  });
}

export function generateColumns() {
  return [
    {
      accessorKey: "picture",
      header: "Picture",
      cell: ({row}) => {
        return <img src={`${row.getValue("picture")}`} width="100" height="100"/>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
        id: "actions",
        cell: () => {
            return <button> View</button>
        }
    }
  ];
}
