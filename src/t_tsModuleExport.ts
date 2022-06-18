export type Cat = {
    breed: string;
    yearOfBirth: number;
};

// export type Dog = {
//     breeds: string[];
//     yearOfBirth: number;
// };

export const createCatName = () => "fluffy";
export interface Dog {
    breeds: string[];
    yearOfBirth: number;
}

module.exports = {
    add: function (a:number, b: number) {
        return a + b
    }
}