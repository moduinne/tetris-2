export const PIECE_IDS = ["L","O","I","T"];
export const PIECE_L = [[1,0,0],[1,1,1],[0,0,0]];
export const PIECE_O = [[1,1,0],[1,1,0],[0,0,0]];
export const PIECE_I = [[0,0,0],[1,1,1],[0,0,0]];
export const PIECE_T = [[0,1,0],[1,1,1],[0,0,0]];

export const T_PERMS = {

    0:[
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    1:[
        [0,1,0],
        [1,1,0],
        [0,1,0]
    ],
    2:[
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    3:[
        [0,1,0],
        [0,1,1],
        [0,1,0]
    ]
}

export const L_PERMS = {

    0:[
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    1:[
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    2:[
        [0,0,0],
        [1,1,1],
        [0,0,1]
    ],
    3:[
        [0,1,1],
        [0,1,0],
        [0,1,0]
    ]
}

export const I_PERMS = {
    
    0:[
        [0,0,0],
        [1,1,1],
        [0,0,0]
    ],
    1:[
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ]
}