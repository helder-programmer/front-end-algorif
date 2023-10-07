import { Button } from "@mui/material";

function CodeChecker() {
    return (
        <section>
            <div className='px-4 py-2 flex gap-4 justify-end'>
                <Button
                    variant='outlined'
                    href="#output"
                // onClick={handleRun}
                >
                    Executar
                </Button>

                <Button
                    variant='outlined'
                    href="#Verificado"
                // onClick={checkQuestion}
                >
                    Verificar Resposta
                </Button>
                <Button
                    variant='outlined'
                    href="#Verificado"
                // onClick={checkQuestion}
                >
                    Enviar resposta
                </Button>
            </div>

            <div id="output"
                className='bg-[#1F2937] border overflow-y-auto border-gray-700 lg:h-[280px] h-[200px] p-6' />

            {/* <div id="Verificado">
                {show || error ? (
                    <div
                        className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
                        {testResults.map((result, index) => (
                            <div key={index} className={`${result ? 'border-green-600 bg-green-700' : 'border-red-600 bg-red-700'} border p-4 m-2 `} />
                        ))}
                    </div>
                ) : null}
            </div> */}
        </section>
    );
}

export default CodeChecker;