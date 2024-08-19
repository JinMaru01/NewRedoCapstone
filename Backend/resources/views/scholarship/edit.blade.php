<x-app-layout>
    <x-slot name="header">
        {{ __('Edit Scholarship') }}
    </x-slot>

    <div class="flex mb-2 space-x-2">
        <a href="{{ route('scholarships.index') }}" class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 shadow-lg flex items-center">
            <i class="fas fa-arrow-left px-1"></i>
            <span>Back</span>
        </a>
        <button type="submit" form="scholarshipForm" class="bg-blue-500 text-white font-bold ml-2 py-2 px-4 rounded hover:bg-blue-600 shadow-lg flex items-center">
            <i class="fas fa-save px-1"></i>
            <span>Update</span>
        </button>
    </div>

    <div class="flex flex-col">
        <div class="w-full">
            <div class="bg-white shadow-md rounded-lg p-6">
                <form id="scholarshipForm" action="{{ route('scholarships.update', $scholarship) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @include('components.message-error')
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="organization_id" class="block text-gray-700 font-medium mb-2">Organization</label>
                            <select id="organization_id" name="organization_id" class="form-select mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="" disabled>Select Organization</option>
                                @foreach($organizations as $organization)
                                    <option value="{{ $organization->id }}" {{ $scholarship->organization_id == $organization->id ? 'selected' : '' }}>
                                        {{ $organization->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <label for="degree" class="block text-gray-700 font-medium mb-2">Degree</label>
                            <select id="degree" name="degree" class="form-select mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="" disabled>Select Degree</option>
                                <option value="high_school" {{ $scholarship->degree == 'high_school' ? 'selected' : '' }}>High School</option>
                                <option value="bachelor" {{ $scholarship->degree == 'bachelor' ? 'selected' : '' }}>Bachelor</option>
                                <option value="master" {{ $scholarship->degree == 'master' ? 'selected' : '' }}>Master</option>
                                <option value="phd" {{ $scholarship->degree == 'phd' ? 'selected' : '' }}>PhD</option>
                            </select>
                        </div>

                        <div>
                            <label for="eligibility" class="block text-gray-700 font-medium mb-2">Eligibility</label>
                            <input type="text" id="eligibility" name="eligibility" placeholder="Enter Eligibility" value="{{ old('eligibility', $scholarship->eligibility) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="qualification" class="block text-gray-700 font-medium mb-2">Qualification</label>
                            <select id="qualification" name="qualification" class="form-select mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="" disabled>Select Qualification</option>
                                <option value="high_school" {{ $scholarship->qualification == 'high_school' ? 'selected' : '' }}>High School</option>
                                <option value="bachelor" {{ $scholarship->qualification == 'bachelor' ? 'selected' : '' }}>Bachelor</option>
                                <option value="master" {{ $scholarship->qualification == 'master' ? 'selected' : '' }}>Master</option>
                                <option value="phd" {{ $scholarship->qualification == 'phd' ? 'selected' : '' }}>PhD</option>
                            </select>
                        </div>

                        <div>
                            <label for="deadline" class="block text-gray-700 font-medium mb-2">Deadline</label>
                            @php
                                $formattedDeadline = $scholarship->deadline ? \Carbon\Carbon::parse($scholarship->deadline)->format('Y-m-d') : '';
                            @endphp
                            <input type="date" id="deadline" name="deadline" value="{{ old('deadline', $formattedDeadline) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>


                        <div>
                            <label for="offer" class="block text-gray-700 font-medium mb-2">Offer</label>
                            <input type="text" id="offer" name="offer" placeholder="Enter Offer" value="{{ old('offer', $scholarship->offer) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        {{-- <div>
                            <label for="award" class="block text-gray-700 font-medium mb-2">Award</label>
                            <input type="number" id="award" name="award" placeholder="Enter Award Amount" value="{{ old('award', $scholarship->award) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div> --}}
                        <div>
                            <label for="available_position" class="block text-gray-700 font-medium mb-2">Available Positions</label>
                            <input type="number" id="available_position" name="available_position" placeholder="Enter Available Positions" value="{{ old('available_position', $scholarship->available_position) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="image" class="block text-gray-700 font-medium mb-2">Image</label>
                            <input type="file" id="image" name="image"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="english_proficiency" class="block text-gray-700 font-medium mb-2">English Proficiency</label>
                            <input type="text" id="english_proficiency" name="english_proficiency" placeholder="Enter English Proficiency Requirement" value="{{ old('english_proficiency', $scholarship->english_proficiency) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="major" class="block text-gray-700 font-medium mb-2">Major</label>
                            <input type="text" id="major" name="major" placeholder="Enter Major" value="{{ old('major', $scholarship->major) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="location" class="block text-gray-700 font-medium mb-2">Location</label>
                            <input type="text" id="location" name="location" placeholder="Enter Location" value="{{ old('location', $scholarship->location) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="age" class="block text-gray-700 font-medium mb-2">Age</label>
                            <input type="number" id="age" name="age" placeholder="Enter Age Requirement" value="{{ old('age', $scholarship->age) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="gpa" class="block text-gray-700 font-medium mb-2">GPA</label>
                            <input type="text" id="gpa" name="gpa" placeholder="Enter GPA Requirement" value="{{ old('gpa', $scholarship->gpa) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="program_duration" class="block text-gray-700 font-medium mb-2">Program Duration</label>
                            <input type="text" id="program_duration" name="program_duration" placeholder="Enter Program Duration" value="{{ old('program_duration', $scholarship->program_duration) }}"
                                class="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
