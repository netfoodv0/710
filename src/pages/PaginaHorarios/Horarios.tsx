import { useHorarios } from './hooks';
import { 
  HorariosLayout, 
  TimezoneSelector, 
  DayScheduleRow 
} from './components';
import { HorariosProps } from './types';

export default function Horarios({}: HorariosProps) {
  const { 
    data, 
    isLoading,
    isSaving,
    handleUpdateHorario, 
    handleUpdateFusoHorario, 
    handleToggleDia, 
    handleSaveHorarios, 
    t 
  } = useHorarios();

  return (
    <HorariosLayout>
      <div className="space-y-6">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Loading State */}
          {isLoading ? (
            <div className="p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8217d5]"></div>
                <span className="ml-3 text-gray-600">Carregando horários...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Timezone Selector */}
              <div className="p-6 border-b border-gray-200">
                <TimezoneSelector
                  value={data.fusoHorario}
                  onChange={handleUpdateFusoHorario}
                  t={t}
                />
              </div>

              {/* Daily Schedule */}
              <div className="p-6">
                <div className="space-y-1">
                  {data.horarios.map((horario) => (
                    <DayScheduleRow
                      key={horario.diaSemana}
                      horario={horario}
                      onUpdateHorario={handleUpdateHorario}
                      onToggleDia={handleToggleDia}
                      t={t}
                    />
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-center">
                  <button
                    onClick={handleSaveHorarios}
                    disabled={isSaving}
                    className={`px-8 h-10 text-white text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-[#8217d5] focus:ring-offset-2 transition-colors ${
                      isSaving 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#8217d5] hover:bg-[#6b1599]'
                    }`}
                  >
                    {isSaving ? 'Salvando...' : t('save')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </HorariosLayout>
  );
}
