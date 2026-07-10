document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("menu").innerHTML = `
            <div class="container-fluid">
            <a class="navbar-brand" href="public/img/logo-web-azul-negro.png">
            <img src="img/logo-web-azul-negro.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
            <span class="logo-text">LSV</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">TE PUEDE INTERESAR</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="d-flex mt-3">
                    <input class="form-control" type="search" placeholder="Filtro de busqueda" id="searchInput" aria-label="Search"/>
                </div>
                <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/"><i class="bi bi-house-door-fill me-2"></i>Inicio</a>
                    </li>
                    <li class="nav-item" id="itemRifa">
                    <a class="nav-link active" href="#" data-bs-toggle="modal" data-bs-target="#modalRifas"><i class="bi bi-file-earmark-text-fill me-2"></i>Creación de rifas</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="formInvitacion.html"><i class="bi bi-envelope-plus-fill me-2"></i>Creación de invitaciones</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="pdf/Instructivo_pianoByOLSV.pdf"><i class="bi bi-file-earmark-pdf-fill me-2"></i>Piano PDF</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="videos.html"><i class="bi bi-camera-video-fill me-2"></i>Grabacion de eventos</a>
                    </li>
                </ul>
                <small id="sinResultados" class="text-danger"></small>
                </div>
            </div>
            </div>
    `;

    document.getElementById("modalRifas").innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        SELECCIONE UN DISEÑO
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">

                    <div class="row">

                        <div class="col-md-6 text-center">

                            <a href="formRifas.html">
                                <img
                                    src="img/Rifa1.png"
                                    class="img-fluid plantilla-rifa"
                                    alt="Diseño 1">
                            </a>

                            <h6 class="mt-2">
                                Diseño clásico
                            </h6>

                        </div>

                        <div class="col-md-6 text-center">

                            <a href="formRifas1.html">
                                <img
                                    src="img/Rifa2.png"
                                    class="img-fluid plantilla-rifa"
                                    alt="Diseño 2">
                            </a>

                            <h6 class="mt-2">
                                Diseño detallado
                            </h6>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
    `;

    document.getElementById("footer").innerHTML = `
        <div class="container">
            <div class="d-flex justify-content-between align-items-center py-4">
                <div>
                    <img src="img/logo-web-azul-negro.png" width="35">
                    <span class="mb-3 mb-md-0 text-body-secondary">© 2026 Oscar Segura</span>
                </div>
                <div>
                    <a href="https://www.instagram.com/oscar_l987?igsh=MTNpbm5oeWtrNGl5ZA==" class="text-body-secondary">
                        <i class="bi bi-instagram fs-2"></i>
                    </a>

                    <a href="https://www.facebook.com/leonel.segura.50" class="text-body-secondary">
                        <i class="bi bi-facebook fs-2"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

});

