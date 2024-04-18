const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
            
                // Proceso real de autenticación no borrar
                const actions = getActions();
                try {
                    const data = await actions.APIfetch("/login", "POST", { email, password });
                    if (data.error) {
                        console.error("Login error:", data.error);
                        return { success: false, error: data.error }; 
                    }
                    setStore({ token: data.token });
                    localStorage.setItem("accessToken", data.token);
                    return { success: true }; 
                } catch (error) {
                    console.error("Error:", error);
                    return { success: false, error: "Incorrect credentials" };
                }
            },

            signup: async (email, password) => {
                const actions = getActions();
                try {
                    const res = await actions.APIfetch("/signup", "POST", {
                        email, password
                    });
                    if (res.error) {
                        console.error("Error al registrar el usuario:", res.error);
                        return false;
                    } else {
                        console.log("Usuario registrado exitosamente");
                        return true;
                    }
                }
                catch (error) {
                    console.error("Error al realizar la petición:", error);
                    return false;
                }
            },

            logout: () => {
                setStore({ token: null });
                localStorage.removeItem('accessToken');
            },
			APIfetch: async (endpoint, method = "GET", body = null) => {
                const backendURL = process.env.BACKEND_URL || "http://localhost:5000";

                const params = { method, headers: {} };
                if (body) {
                    params.headers["Content-Type"] = "application/json";
                    params.body = JSON.stringify(body);
                }
                try {
                    const res = await fetch(`${backendURL}api${endpoint}`, params);
                    if (!res.ok) throw new Error(res.statusText);
                    return await res.json();
                } catch (error) {
                    console.error("Error fetching data durign login:", error);
                    throw error;
                }
            },
			
		}
	};
};

export default getState;
