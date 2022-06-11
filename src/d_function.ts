function strLog(obj: {a: string, b?:string}) {
    // ? 可选字符的用法
    // if(obj.b)  {
    //     console.log(obj.b.toLocaleLowerCase());  
    // }
    obj.b?.toLocaleLowerCase()
}
strLog({a: 'name'});

// 联合类型
function printId (id: number|string|string[]) {
    // console.log(id.toUperCase());
    if (typeof id === 'string') {

    } else if(Array.isArray(id)) {
        id.join(',')
    }
    
}
printId('1234') 
printId(123)
