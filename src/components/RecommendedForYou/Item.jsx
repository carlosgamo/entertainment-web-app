const Item = ({item}) => { 
    return (
        <>
            <div className="border-white boder-2 rounded-md text-gray-400 pt-2 pb-4">
                <img className="rounded-lg" src={"src/"+item.thumbnail.regular.small} width="180" height="150"/>
           
                <div className="text-xs pt-2">
                    {item.year} - {item.category} - {item.rating}
                    <div className="text-gray-200 text-lg">{item.title}</div>
                </div>
            </div>
        </>
    )
 };

 export default Item;