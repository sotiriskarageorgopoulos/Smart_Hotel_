/**
 * @author Sotirios Karageorgopoulos
 */
export const hotelResHistoryCol = [
    {
        id: "resDate",
        label:'reservation date',
        minWidth: 270,
        format: (value) => {
            return value.slice(0,10)+" "+value.slice(11,16)
        }
    },
    { 
        id: 'duration',
        label: 'days',
        minWidth: 170
    },
    { 
        id: 'totalPrice',
        label: 'income ($)',
        minWidth: 170
    },
    {
        id:'customerNotes',
        label: 'customer notes',
        minWidth: 1200
    }
]