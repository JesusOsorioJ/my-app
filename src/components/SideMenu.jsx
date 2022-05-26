import { Link } from 'react-router-dom';

import './scss/SideMenu.scss';

function SideMenu(){    
    return(
        <div className="SideMenu">
            
            <div className="SideMenuBar">
            <div className="SideMenuBarText">Test en vivo</div>
            <a href="/teacher/0/0">Iniciar test</a>
            </div>

            <div className="SideMenuBar">
            <div className="SideMenuBarText">Administar Test</div>
            <a href="/testname/0/0">Crear prueba</a>
            <a href="/listTest/">Lista de pruebas</a>
            </div>
            <div className="SideMenuBar">
            <div className="SideMenuBarText">Administar Cursos</div>
            <a href="/teachercurse/1">Agregar cursos</a>
            <a href="/teachercurse/0">Lista de cursos</a>
            </div>

            <div className="SideMenuBar">
            <div className="SideMenuBarText" >Mis notas</div>
            <a href="/teachernotes/0/0">Por test</a>
            <a href="/teachernotes/0/0">Por estudiantes</a>
            <a href="/">Por curso</a>
            </div>
        </div>
     )    
}

export default SideMenu
