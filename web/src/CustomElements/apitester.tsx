export default Apitester

function Apitester() {
    return (
        <>
            <form>
                <label htmlFor={"endpoint"}>Endpoint</label>
                <input id={"endpoint"} type={"text"} name={"endpoint"}/>

                <br/>

                <label htmlFor={"postMethod"}>POST</label>
                <input id={"postMethod"} type={"radio"} name={"method"} value={"POST"}/>

                <label htmlFor={"getMethod"}>GET</label>
                <input id={"getMethod"} type={"radio"} name={"method"} value={"GET"}/>

                <label htmlFor={"patchMethod"}>PATCH</label>
                <input id={"patchMethod"} type={"radio"} name={"method"} value={"PATCH"}/>

                <label htmlFor={"putMethod"}>PUT</label>
                <input id={"putMethod"} type={"radio"} name={"method"} value={"PUT"}/>

                <br/>

                <label htmlFor={"jsonInput"}>JSON Input.</label>
                <input id={"jsonInput"} type={"text"} name={"jsonInput"}/>

                <br/>

                <button type="submit" formAction={getData}>Submit</button>
            </form>
        </>
    )
}

async function getData(form: FormData) {
    console.log(form)
    const endpointInput = (form.get("endpoint") as string);
    const methodInput = (form.get("method") as string);

    let request: Request

    // If it is a GET request, ignore body.
    if (methodInput == "GET") {
        request = new Request(endpointInput, {
            method: "GET",
        });
    } else {
        request = new Request(endpointInput, {
            method: "POST",
            body: form.get("jsonInput") as string,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
    }
}