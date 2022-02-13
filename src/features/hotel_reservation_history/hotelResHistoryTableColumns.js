/**
 * @author Sotirios Karageorgopoulos
 */
export const hotelResHistoryCol = [
    { 
        id: 'name',
        label: 'customer name',
        minWidth: 170
    },
    { 
        id: 'surname',
        label: 'customer surname',
        minWidth: 170
    },
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
        label: 'customerNotes',
        minWidth: 1200
    },
    { 
        id: 'receptionistId',
        label: 'receptionist id',
        minWidth: 170
    },
    {
        id: 'text',
        label: 'receptionistNotes',
        minWidth: 1200
    }
]