import React from 'react'
import { FaTimes } from 'react-icons/fa';


const ShowTeacherModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-3xl p-8 rounded-md shadow-lg max-h-screen overflow-y-auto">
        <div className="flex justify-end">
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
            <div className="p-6 relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold tracking-wider text-gray-800">Detail Data Guru</h3>
                </div>

                {/* Teacher Information */}
                <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
                    <div>
                        <p><strong>Nama Lengkap:</strong> {item.nama}</p>
                        <p><strong>NUPTK:</strong> {item.nuptk}</p>
                        <p><strong>Jenis Kelamin:</strong> {item.gender.nama}</p>
                        <p><strong>Tempat Lahir:</strong> {item.tempat_lahir}</p>
                        <p><strong>Tanggal Lahir:</strong> {item.tanggal_lahir}</p>
                        <p><strong>NIP:</strong> {item.nip}</p>
                        <p><strong>Status Kepegawaian:</strong> {item.status_kepegawaian}</p>
                        <p><strong>Jenis PTK:</strong> {item.jenis_ptk}</p>
                        <p><strong>Agama:</strong> {item.agama}</p>
                        <p><strong>Alamat Jalan:</strong> {item.alamat_jalan}</p>
                        <p><strong>RT:</strong> {item.rt}</p>
                        <p><strong>RW:</strong> {item.rw}</p>
                        <p><strong>Nama Dusun:</strong> {item.nama_dusun}</p>
                        <p><strong>Desa/Kelurahan:</strong> {item.desa_kelurahan}</p>
                      </div>
                      <div>
                        <p><strong>Kecamatan:</strong> {item.kecamatan}</p>
                        <p><strong>Kode POS:</strong> {item.rw}</p>
                        <p><strong>Telepon:</strong> {item.telepon}</p>
                        <p><strong>No HP:</strong> {item.hp}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Tugas Tambahan:</strong> {item.tugas_tambahan}</p>
                        <p><strong>SK CPNS:</strong> {item.sk_cpns}</p>
                        <p><strong>Tanggal CPNS:</strong> {item.tanggal_cpns}</p>
                        <p><strong>SK Pengangkatan:</strong> {item.sk_pengangkatan}</p>
                        <p><strong>TMT Pengangkatan:</strong> {item.tmt_pengangkatan}</p>
                        <p><strong>Lembaga Pengangkatan:</strong> {item.lembaga_pengangkatan}</p>
                        <p><strong>Pangkat Golongan:</strong> {item.pangkat_golongan}</p>
                        <p><strong>Pendidikan:</strong> {item.pendidikan}</p>
                        <p><strong>Gaji:</strong> {item.gaji}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ShowTeacherModal
