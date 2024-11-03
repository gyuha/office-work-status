document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("config-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch("/config", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.result) {
            alert("Saved successfully");
        } else {
            alert("Save failed");
        }
    });
});
