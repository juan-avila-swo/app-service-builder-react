import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { checkHealth } from './health'

const appInfo = {
  app: 'app-service-builder-react',
  version: '1.0.0',
  framework: 'React 19 with Vite 8',
  deploymentMarker: import.meta.env.VITE_DEPLOYMENT_MARKER ?? 'local',
  buildMarker: import.meta.env.VITE_BUILD_MARKER ?? 'local',
}

const shows = [
  { title: 'Neón salvaje', category: 'Acción', tag: 'TOP 10', palette: 'neon', mark: 'NS' },
  { title: 'Planeta pop', category: 'Aventura', tag: 'NUEVO', palette: 'pop', mark: 'PP' },
  { title: 'La última ola', category: 'Drama', tag: 'ORIGINAL', palette: 'wave', mark: 'LO' },
  { title: 'Modo leyenda', category: 'Acción', tag: 'TENDENCIA', palette: 'legend', mark: 'ML' },
]

const categories = ['Todo', 'Acción', 'Aventura', 'Drama']

function Header() {
  return (
    <header className="stream-header">
      <Link className="stream-logo" to="/" aria-label="Viva, inicio">
        <span className="logo-mark">V</span>VIVA<span className="logo-plus">+</span>
      </Link>
      <nav className="stream-nav" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Series</a>
        <a href="#catalogo">Películas</a>
        <a href="#mi-lista">Mi lista</a>
      </nav>
      <button className="profile-button" type="button" aria-label="Perfil de usuario">J</button>
    </header>
  )
}

function Layout({ children }) {
  return (
    <main className="stream-app">
      <Header />
      {children}
      <footer className="stream-footer">
        <Link to="/">App Service Builder</Link>
        <a href="https://react.dev/">Documentación de React</a>
        <Link to="/products/widget-1">Ruta de prueba</Link>
      </footer>
    </main>
  )
}

function Home() {
  const [count, setCount] = useState(0)
  const [checking, setChecking] = useState(false)
  const [health, setHealth] = useState('Comprueba la conexión del archivo de estado.')
  const [category, setCategory] = useState('Todo')
  const [saved, setSaved] = useState(false)
  const [playing, setPlaying] = useState(false)
  const visibleShows = category === 'Todo' ? shows : shows.filter((show) => show.category === category)

  async function refreshHealth() {
    setChecking(true)
    setHealth('Consultando /health.json…')
    try {
      setHealth(await checkHealth())
    } catch {
      setHealth('No se pudo consultar el estado. Revisa /health.json e inténtalo de nuevo.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <Layout>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> VIVA ORIGINAL · ESTRENO</p>
          <h1>Tu próxima<br />obsesión <span>empieza aquí.</span></h1>
          <p className="hero-description">
            Historias que te sacuden. Mundos que no quieres dejar. Dale play a algo extraordinario.
          </p>
          <div className="hero-meta"><span>2025</span><span>16+</span><span>1 temporada</span><span className="quality">4K UHD</span></div>
          <div className="hero-actions">
            <button className="play-button" type="button" onClick={() => setPlaying((current) => !current)}>
              <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{playing ? 'Pausar avance' : 'Ver ahora'}
            </button>
            <button className="list-button" id="mi-lista" type="button" onClick={() => setSaved((current) => !current)}>
              <span aria-hidden="true">{saved ? '✓' : '+'}</span>{saved ? 'En mi lista' : 'Mi lista'}
            </button>
          </div>
          {playing && <p className="play-status" role="status">Reproduciendo el avance de Neón salvaje</p>}
        </div>
        <div className="hero-art" aria-label="Arte gráfico de Neón salvaje" role="img">
          <div className="hero-sun" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-stamp">VIVA<br />ORIGINAL</span>
          <span className="hero-title-art">NEÓN<br /><i>SALVAJE</i></span>
          <span className="hero-art-caption">LA CIUDAD NUNCA DUERME</span>
        </div>
      </section>

      <section className="catalog" id="catalogo" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ESCOGIDO PARA TI</p>
            <h2 id="catalog-title">Ahora mismo <span>en VIVA</span></h2>
          </div>
          <div className="category-filters" aria-label="Filtrar por género">
            {categories.map((item) => (
              <button
                className={category === item ? 'filter-chip active' : 'filter-chip'}
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="show-grid">
          {visibleShows.map((show, index) => (
            <article className={`show-card ${show.palette}`} key={show.title}>
              <div className="poster-art">
                <span className="poster-tag">{show.tag}</span>
                <span className="poster-symbol">{show.mark}</span>
                <span className="poster-index">0{index + 1}</span>
              </div>
              <div className="show-info">
                <div><h3>{show.title}</h3><p>{show.category} · Para ti</p></div>
                <button className="card-play" type="button" aria-label={`Ver ${show.title}`}>▶</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="utility-panel" aria-label="Herramientas de muestra">
        <div>
          <p className="eyebrow">ESTADO DEL SITIO</p>
          <p className="health-result" role="status">{health}</p>
        </div>
        <button className="health-button" type="button" disabled={checking} onClick={refreshHealth}>
          {checking ? 'Consultando…' : 'Comprobar conexión'}
        </button>
      </section>
      <div className="sample-tools">
        <button className="counter" type="button" onClick={() => setCount((current) => current + 1)}>
          Interacciones: {count}
        </button>
        <a href="/version.json">Ver datos de versión</a>
        <details>
          <summary>Detalles de despliegue</summary>
          <dl>
            <div><dt>Aplicación</dt><dd>{appInfo.app} {appInfo.version}</dd></div>
            <div><dt>Framework</dt><dd>{appInfo.framework}</dd></div>
            <div><dt>Despliegue</dt><dd>{appInfo.deploymentMarker}</dd></div>
            <div><dt>Build</dt><dd>{appInfo.buildMarker}</dd></div>
          </dl>
        </details>
      </div>
    </Layout>
  )
}

function Product() {
  return (
    <Layout>
      <section className="route-message">
        <p className="eyebrow">RUTA DE PRUEBA</p>
        <h1>Widget 1</h1>
        <p>La navegación directa de React Router funciona correctamente.</p>
        <Link className="play-button route-button" to="/">Volver al catálogo</Link>
      </section>
    </Layout>
  )
}

function NotFound() {
  return (
    <Layout>
      <section className="route-message">
        <p className="eyebrow">ERROR 404</p>
        <h1>Esta historia<br /><span>aún no existe.</span></h1>
        <Link className="play-button route-button" to="/">Volver al catálogo</Link>
      </section>
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/widget-1" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
