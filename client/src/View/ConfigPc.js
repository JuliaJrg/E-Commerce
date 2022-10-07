import Hardware_select from '../components/ConfigPc/Hardware_select';

function Config_pc() {
  return (
    <section class='config-pc'>
      <h1 class='config-pc-title'>Configurateur PC</h1>
      <div class='config-pc-container'>
        <Hardware_select />
      </div>
    </section>
  );
}

export default Config_pc;
