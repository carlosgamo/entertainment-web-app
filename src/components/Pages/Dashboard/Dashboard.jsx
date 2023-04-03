const Dashboard = ({profile, displayTrending, setDisplayTrending}) => { 
    
    return(
        <>
            <div className="ml-8 mt-5 p-6 text-white bg-slate-800 rounded-lg w-96 h-96">
                <h1 className="text-2xl">
                    Dashboard - {profile.name}
                </h1>
                <h2 className="text-xl text-gray-400 mt-4 mb-2">App Language</h2>
                <hr/>
                <input type="radio" id="english" name="language" className="ml-4 mt-4"/><label for="english"> English</label>
                <input type="radio" id="spanish" name="language" className="ml-4 mt-4"/><label for="spanish"> Spanish</label>
                <br/>
                <h2 className="text-xl text-gray-400 mt-8 mb-2">Update preferences</h2>
                <hr/>
                <input type="checkbox" checked={displayTrending} className="ml-4 mt-4"
                    onChange={() => setDisplayTrending(!displayTrending)}
                /> Display Trending
                <div id="buttons">
                    <button className="bg-slate-600 rounded-md border-2 border-white pt-1 pb-1 pl-4 pr-4 mt-10 hover:bg-blue-500">Save</button>
                    <button className="bg-slate-600 rounded-md border-2 border-white pt-1 pb-1 pl-4 pr-4 ml-10 hover:bg-blue-500">Cancel</button>
                </div>
            </div>
        </>
    )
 }

 export default Dashboard;