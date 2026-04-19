import { useEffect, useState } from "react";
import { getResources } from "../api/api";
import ResourceCard from "../components/ResourceCard";

export default function Dashboard() {
    // console.log("hello")
    const [resources, setResources] = useState([]);

    const load = () => getResources().then(r => {
        // console.log(r);
        setResources(r);
    })
    // console.log(resources);

    useEffect(() => { load(); }, []);

    return (
        <div>
            <h2>Available Resources</h2>
            <div className="grid">
                {resources.map(r => <ResourceCard key={r.id} resource={r} onBooked={load} />)}
            </div>
        </div>
    );
}







