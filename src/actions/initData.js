
export const initData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'First work',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'View myCV',
                            cover: 'https://i.pinimg.com/564x/6a/0d/ba/6a0dba51a33a15b43c3c13978882f94e.jpg'
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Your Evalution',
                    cardOrder: ['card-7', 'card-8', 'card-9', 'card-10'],
                    cards: [
                        {
                            id: 'card-7',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'View my project',
                            cover: 'https://i.pinimg.com/564x/1d/36/a9/1d36a93d6ca08a121ff0084a1c83df18.jpg'
                        }

                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done column',
                    cardOrder: ['card-11', 'card-12', 'card-13'],
                    cards: [
                        {
                            id: 'card-11',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'I really happy',
                            cover: 'https://i.pinimg.com/564x/9e/ec/5f/9eec5ff055df56c7e63a7d1357b36790.jpg'
                        },
                        {
                            id: 'card-12',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'If we have an interview',
                            cover: null
                        },
                        {
                            id: 'card-13',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Thank u <3 ',
                            cover: null
                        }
                    ]
                }

            ]
        }
    ],
    contact: [
        {
            id: 'ct-1',
            title: 'facebook',
            img: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.6435-9/cp0/238872695_637254067677678_1603704467664782346_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=D_4qYvUaFKYAX9qYnCN&_nc_ht=scontent.fhan5-5.fna&oh=158dbc4f94f4f975573717aa3ee50f32&oe=613FEEFB',
            src: 'https://www.facebook.com/yeuHienMai2003'
        },
        {
            id: 'ct-2',
            title: 'Github',
            img: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.6435-9/cp0/234803161_637251244344627_9083235869532119155_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=0hTaz0eNqy0AX8P-jHY&tn=m4QRv7cwObWWmuEG&_nc_ht=scontent.fhan5-5.fna&oh=bf1256240b908d3015ce291716e651f6&oe=613DF89C',
            src: 'https://github.com/thuhuong1995'
        },
        {
            id: 'ct-3',
            title: 'phone',
            img: 'https://scontent.fhan5-7.fna.fbcdn.net/v/t1.6435-9/cp0/238909852_637251257677959_2477337409476432278_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=aoYvAIJ31Y8AX903oS8&_nc_ht=scontent.fhan5-7.fna&oh=6454a81e23b02222a24531303b7833ad&oe=613E1407',
            src: ''
        }
    ]
}